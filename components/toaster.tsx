'use client';
import React, { useEffect, useReducer, useRef, useState, useSyncExternalStore } from 'react';
import Alert from './alert';
import { addToast, removeToast, visibleToasts, pauseReducer, isPaused, type ToastItem } from '../internal/toaster';

export type ToastInput = {
  type?: 'success' | 'warning' | 'error' | 'info' | 'default';
  message: string;
  secondMessage?: string;
  /** Milliseconds before the toast closes itself; `null` keeps it until closed. Default 5000, and `null` for errors. A value that is not finite or is above 2^31-1 (what `setTimeout` can hold) counts as `null`. */
  duration?: number | null;
};

// Matches Alert's exit transition
const EXIT_MS = 150;

// One store per bundle, shared by every importer
type Store = { toasts: ToastItem[]; mounts: symbol[] };
let store: Store = { toasts: [], mounts: [] };
const serverStore: Store = { toasts: [], mounts: [] };
const listeners = new Set<() => void>();
let nextId = 0;

const setStore = (next: Store) => {
  store = next;
  listeners.forEach((l) => l());
};
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Shows a toast and returns its id. Call it from client code (event handlers and effects), not from a Server Component or a server action. */
export function toast(input: string | ToastInput): string {
  const id = `toast-${++nextId}`;
  // During a server render there is no Toaster to show it, and the store would outlive the request
  if (typeof window === 'undefined') return id;
  setStore({ ...store, toasts: addToast(store.toasts, input, id) });
  return id;
}

export function dismissToast(id: string): void {
  const toasts = removeToast(store.toasts, id);
  if (toasts !== store.toasts) setStore({ ...store, toasts });
}

function Toast({ item }: { item: ToastItem }) {
  const [open, setOpen] = useState(true);
  const [pause, dispatch] = useReducer(pauseReducer, { hovered: false, focused: false });
  const paused = isPaused(pause);
  const remainingMs = useRef(item.duration);

  useEffect(() => {
    if (!open || paused || remainingMs.current === null) return;
    const startedAt = Date.now();
    const timer = setTimeout(() => setOpen(false), remainingMs.current);
    return () => {
      clearTimeout(timer);
      if (remainingMs.current !== null) remainingMs.current -= Date.now() - startedAt;
    };
  }, [open, paused]);

  // Let the alert fade out, then take the toast out of the store
  useEffect(() => {
    if (open) return;
    const timer = setTimeout(() => dismissToast(item.id), EXIT_MS);
    return () => clearTimeout(timer);
  }, [open, item.id]);

  return (
    <div
      className="pointer-events-auto"
      onMouseEnter={() => dispatch('pointerEnter')}
      onMouseLeave={() => dispatch('pointerLeave')}
      onFocus={() => dispatch('focus')}
      // Focus moving to another element inside the same toast has not left it
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) dispatch('blur'); }}
    >
      <Alert
        variant="inline"
        showCloseButton
        autoDismiss={false}
        open={open}
        type={item.type}
        message={item.message}
        secondMessage={item.secondMessage}
        onClose={() => dismissToast(item.id)}
      />
    </div>
  );
}

// Mount once near the app root. A second Toaster renders nothing.
export default function Toaster() {
  const { toasts, mounts } = useSyncExternalStore(subscribe, () => store, () => serverStore);
  const [me] = useState(() => Symbol('Toaster'));

  useEffect(() => {
    setStore({ ...store, mounts: [...store.mounts, me] });
    return () => setStore({ ...store, mounts: store.mounts.filter((m) => m !== me) });
  }, [me]);

  if (mounts[0] !== me) return null;
  const shown = visibleToasts(toasts);
  if (shown.length === 0) return null;

  // Above modals; the column lets clicks through beside and between the toasts
  return (
    <div className="fixed top-4 inset-x-0 z-[var(--os-z-tooltip)] flex justify-center px-4 pointer-events-none">
      <div className="flex flex-col gap-2 w-full max-w-md">
        {shown.map((item) => <Toast key={item.id} item={item} />)}
      </div>
    </div>
  );
}
