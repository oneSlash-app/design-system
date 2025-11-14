import React from 'react';
interface TimeStampProps {
    createdAt: string | number | Date;
    dateFormat: 'absolute' | 'relative';
    textSize?: 'small' | 'medium' | 'large';
    textColor?: 'secondary' | 'primary';
    data?: 'date-and-time' | 'date' | 'time';
}
export default function TimeStamp({ createdAt, dateFormat, textSize, textColor, data, }: TimeStampProps): React.JSX.Element;
export {};
