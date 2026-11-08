import React from 'react';
interface Fact {
    label: string;
    value: React.ReactNode;
}
interface FactsRowProps {
    items: Fact[];
}
export default function FactsRow({ items }: FactsRowProps): React.JSX.Element;
export {};
