import React from 'react';
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
export declare function addToast(state: ToastItem[], input: string | ToastInput, id: string): ToastItem[];
export declare function removeToast(state: ToastItem[], id: string): ToastItem[];
export declare function visibleToasts(state: ToastItem[]): ToastItem[];
type PauseState = {
    hovered: boolean;
    focused: boolean;
};
type PauseEvent = 'pointerEnter' | 'pointerLeave' | 'focus' | 'blur';
export declare function pauseReducer(state: PauseState, event: PauseEvent): PauseState;
export declare const isPaused: ({ hovered, focused }: PauseState) => boolean;
/** Shows a toast and returns its id. Call it from client code (event handlers and effects), not from a Server Component or a server action. */
export declare function toast(input: string | ToastInput): string;
export declare function dismissToast(id: string): void;
export default function Toaster(): React.JSX.Element | null;
export {};
