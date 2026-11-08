import React from 'react';
interface NumberedRowProps {
    /** Starts at 0; shown as 01, 02. */
    index: number;
    title: string;
    /** What the row says: paragraphs, links. */
    children?: React.ReactNode;
    /** One line with a check, for what the row comes to. */
    proof?: string;
    /** What the row is about, shown beside it on wide windows and under it otherwise. */
    visual?: React.ReactNode;
}
export default function NumberedRow({ index, title, children, proof, visual }: NumberedRowProps): React.JSX.Element;
export {};
