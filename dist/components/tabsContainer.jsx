'use client';
import React from 'react';
export default function TabsContainer(_a) {
    var children = _a.children;
    var tabCount = React.Children.count(children);
    return (<div className={"\n        flex space-x-2 p-1 rounded-[12px] overflow-x-auto\n        ".concat(tabCount > 0 ? 'bg-light-background-accent100 dark:bg-dark-background-accent100' : 'bg-transparent', "\n      ")} style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        }}>
      {children}
    </div>);
}
