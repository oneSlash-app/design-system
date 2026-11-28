import React from 'react';
import { type IconSource } from './iconSlot';
interface EmptyBoxProps {
    text: string;
    secondText?: string;
    size: "small" | "large";
    /** Shown under the text, centered, for the one thing to do next. Wrap more than one Button yourself. */
    action?: React.ReactNode;
    /** Replaces the default icon: a Lucide name, an icon component or an element */
    icon?: IconSource;
}
export default function EmptyBox({ text, secondText, size, action, icon, }: EmptyBoxProps): React.JSX.Element;
export {};
