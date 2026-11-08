import React from 'react';
export declare function headingId(text: string): string | undefined;
interface SectionIntroProps {
    /** The section's name. It is the heading, so a contents list shows it. */
    name: string;
    /** The point the section makes, set large under the name. */
    statement?: string;
    /** What carries on from the statement, usually paragraphs. */
    children?: React.ReactNode;
    id?: string;
}
export default function SectionIntro({ name, statement, children, id }: SectionIntroProps): React.JSX.Element;
export {};
