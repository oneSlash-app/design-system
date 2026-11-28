export type ToastInput = {
    type?: 'success' | 'warning' | 'error' | 'info' | 'default';
    message: string;
    secondMessage?: string;
    /** Milliseconds before the toast closes itself; `null` keeps it until closed. Default 5000, and `null` for errors. */
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
export declare function toast(input: string | ToastInput): string;
export declare function dismissToast(id: string): void;
export default function Toaster(): JSX.Element | null;
