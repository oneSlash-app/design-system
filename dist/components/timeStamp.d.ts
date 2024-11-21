import React from 'react';
interface TimeStampProps {
    createdAt: string | number | Date;
    dateFormat: 'absolute' | 'relative';
}
export default function TimeStamp({ createdAt, dateFormat, }: TimeStampProps): React.JSX.Element;
export {};
