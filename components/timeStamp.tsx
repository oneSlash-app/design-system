'use client';
import React from 'react';

interface TimeStampProps{
    createdAt: string | number | Date;
    dateFormat: 'absolute' | 'relative';
    textSize?: 'small' | 'medium' | 'large';
    textColor?: 'secondary' | 'primary';
    data?: 'date-and-time' | 'date' | 'time';
  }
  
export default function TimeStamp({
    createdAt,
    dateFormat,
    textSize = 'small',
    textColor = 'secondary',
    data = 'date-and-time',
}: TimeStampProps) {

    // absolute timestamp
    const absoluteTimeStamp = (createdAt: string | number | Date): string => {
        const date = new Date(createdAt);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayOfWeek = daysOfWeek[date.getDay()];

        const dateString = `${month}/${day}/${year} ${dayOfWeek}`;
        const timeString = `${formattedHours}:${formattedMinutes}`;

        if (data === 'date') {
            return dateString;
        } else if (data === 'time') {
            return timeString;
        } else {
            return `${dateString} ${timeString}`;
        }
    };

    // relative timestamp
    const relativeTimeStamp = (createdAt: string | number | Date): string => {
        const date = new Date(createdAt);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        // Date-based relativity (years, months, weeks, days)
        if (data === 'date') {
            if (years > 0) {
                return `${years} year${years > 1 ? 's' : ''} ago`;
            } else if (months > 0) {
                return `${months} month${months > 1 ? 's' : ''} ago`;
            } else if (weeks > 0) {
                return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
            } else if (days > 0) {
                return `${days} day${days > 1 ? 's' : ''} ago`;
            } else {
                return 'today';
            }
        }

        // Time-based relativity (hours, minutes, seconds)
        if (data === 'time') {
            if (hours > 0) {
                return `${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else if (minutes > 0) {
                return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
                return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
            }
        }

        // Default: date-and-time (full relativity)
        if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''} ago`;
        } else if (months > 0) {
            return `${months} month${months > 1 ? 's' : ''} ago`;
        } else if (weeks > 0) {
            return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
        }
    };
    
    const timeStamp = dateFormat === 'absolute' ? absoluteTimeStamp(createdAt) : relativeTimeStamp(createdAt);

    // Determine text size class
    const sizeClass = textSize === 'medium' ? 'text-body2' : textSize === 'large' ? 'text-body1' : 'text-caption';

    // Determine text color classes
    const colorClass = textColor === 'primary'
        ? 'text-light-text-primary dark:text-dark-text-primary'
        : 'text-light-text-secondary dark:text-dark-text-secondary';

    return (
        <p className={`${sizeClass} ${colorClass}`}>
            {timeStamp}
        </p>
    );
};