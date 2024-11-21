import React from 'react';
interface EmptyBoxProps {
    text: string;
    size: "small" | "large";
}
export default function EmptyBox({ text, size, }: EmptyBoxProps): React.JSX.Element;
export {};
