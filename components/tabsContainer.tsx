'use client';
import React from 'react';

interface TabsContainerProps {
  children: React.ReactNode;
}

export default function TabsContainer({
  children,
}: TabsContainerProps) {
  const tabCount = React.Children.count(children);

  return (
    <div
      className={`
        flex space-x-2 p-1 rounded-[12px] overflow-x-auto
        ${tabCount > 0 ? 'bg-light-background-accent100 dark:bg-dark-background-accent100' : 'bg-transparent'}
      `}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {children}
    </div>
  );
}