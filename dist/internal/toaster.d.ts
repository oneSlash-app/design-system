import type { ToastInput } from '../components/toaster';
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
export {};
