'use client';
import React, { useEffect, useReducer, useRef, useState, useSyncExternalStore } from 'react';
import Alert from './alert';

export type ToastInput = {
  type?: 'success' | 'warning' | 'error' | 'info' | 'default';
  message: string;
  secondMessage?: string;
  /** Milliseconds before the toast closes itself; `null` keeps it until closed. Default 5000, and `null` for errors. A value that is not finite or is above 2^31-1 (what `setTimeout` can hold) counts as `null`. */
  duration?: number | null;
};

export type ToastItem = {
  id: string;
  type: NonNullable<ToastInput['type']>;
  message: string;
  secondMessage?: string;
  duration: number | null;
};

const DEFAULT_DURATION_MS = 5000;
const MAX_VISIBLE = 3;
// Matches Alert's exit transition
const EXIT_MS = 150;
// The longest delay setTimeout can hold; a longer one fires at once
const MAX_TIMEOUT_MS = 2 ** 31 - 1;

// Pure helpers. The state lists toasts newest first.
export function addToast(state: ToastItem[], input: string | ToastInput, id: string): ToastItem[] {
  const { type = 'default', message, secondMessage, duration } = typeof input === 'string' ? { message: input } as ToastInput : input;
  const wanted = duration !== undefined ? duration : type === 'error' ? null : DEFAULT_DURATION_MS;
  const item = { id, type, message, secondMessage, duration: wanted !== null && Number.isFinite(wanted) && wanted <= MAX_TIMEOUT_MS ? wanted : null };
  return [item, ...state];
}

export function removeToast(state: ToastItem[], id: string): ToastItem[] {
  return state.some((t) => t.id === id) ? state.filter((t) => t.id !== id) : state;
}

// The three oldest are shown, newest on top; the rest wait for room
export function visibleToasts(state: ToastItem[]): ToastItem[] {
  return state.slice(-MAX_VISIBLE);
}

// The timer pauses while the pointer or focus is on the toast; each is tracked on its own
type PauseState = { hovered: boolean; focused: boolean };
type PauseEvent = 'pointerEnter' | 'pointerLeave' | 'focus' | 'blur';
export function pauseReducer(state: PauseState, event: PauseEvent): PauseState {
  switch (event) {
    case 'pointerEnter': return { ...state, hovered: true };
    case 'pointerLeave': return { ...state, hovered: false };
    case 'focus': return { ...state, focused: true };
    case 'blur': return { ...state, focused: false };
  }
}
export const isPaused = ({ hovered, focused }: PauseState) => hovered || focused;

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
export default function Toaster(): JSX.Element | null {
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
