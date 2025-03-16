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
        flex space-x-2 p-1 rounded-[12px]
        ${tabCount > 0 ? 'bg-light-background-accent200 dark:bg-dark-background-accent200' : 'bg-transparent'}
      `}
    >
      {children}
    </div>
  );
}