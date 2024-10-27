'use client';
import React from 'react';

interface TimeStampProps{
    createdAt: string | number | Date;
    dateFormat: 'absolute' | 'relative';
  }
  
export default function TimeStamp({
    createdAt,
    dateFormat,
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
        return `${month}/${day}/${year} ${dayOfWeek} ${formattedHours}:${formattedMinutes}`;
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

    return (
        <p className="text-caption text-light-text-secondary dark:text-dark-text-secondary">
            {timeStamp}
        </p>
    );
};