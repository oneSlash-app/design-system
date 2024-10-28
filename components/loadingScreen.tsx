'use client';
import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-full w-full min-h-[200px]">
        <div className="w-12 h-12 border-4 border-t-transparent border-light-accent-main rounded-full animate-spin"></div>
    </div>
  );
};

export function LoadingSmall() {
  return (
    <div className="flex justify-center items-center h-[40px] w-[40px]">
      <div className="w-[40px] h-[40px] border-4 border-t-transparent border-light-accent-main rounded-full animate-spin"></div>
    </div>
  );
};