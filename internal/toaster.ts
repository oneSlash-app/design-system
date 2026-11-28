// The toast store's pure helpers, kept out of the public API (index.ts and the package exports do not reach internal/)
import type { ToastInput } from '../components/toaster';

export type ToastItem = {
  id: string;
  type: NonNullable<ToastInput['type']>;
  message: string;
  secondMessage?: string;
  duration: number | null;
};

const DEFAULT_DURATION_MS = 5000;
const MAX_VISIBLE = 3;
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
