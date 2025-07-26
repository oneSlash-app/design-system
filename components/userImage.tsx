'use client';
import React from 'react';

interface UserImageProps {
  userHandle: string;
  userImgUrl?: string;
}

function getColorSeed(userHandle: string): string {
  const words = userHandle.trim().split(/\s+/);
  let letters = words.map(word => word.charAt(0).toLowerCase());
  if (letters.length === 1 && words[0].length >= 2) {
    letters.push(words[0].charAt(1).toLowerCase());
  } else if (letters.length > 2) {
    letters = letters.slice(0, 2);
  } else if (letters.length === 0) {
    letters = ['x', 'x'];
  }
  return letters.join('');
}

function getHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export default function UserImage({
  userHandle,
  userImgUrl,
}: UserImageProps) {
  const displayInitial = userHandle.charAt(0).toUpperCase() || 'A';
  const seed = getColorSeed(userHandle);
  const hue = Math.abs(getHash(seed)) % 360;

  // Light mode: vibrant pastel
  const lightBg = `hsl(${hue}, 80%, 80%)`;
  // Dark mode: darker, vibrant variant
  const darkBg = `hsl(${hue}, 80%, 30%)`;

  return (
    <div
      style={{
        '--light-bg': lightBg,
        '--dark-bg': darkBg,
      } as React.CSSProperties}
      className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden bg-[var(--light-bg)] dark:bg-[var(--dark-bg)] text-light-text-secondary dark:text-dark-text-secondary"
    >
      {userImgUrl ? (
        <img
          src={userImgUrl}
          alt={userHandle}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className="text-body1 text-light-text-secondary dark:text-dark-text-secondary">
          {displayInitial}
        </span>
      )}
    </div>
  );
}