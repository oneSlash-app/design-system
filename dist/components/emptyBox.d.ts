import React from 'react';
interface EmptyBoxProps {
    text: string;
    secondText?: string;
    size: "small" | "large";
}
export default function EmptyBox({ text, secondText, size, }: EmptyBoxProps): React.JSX.Element;
export {};
