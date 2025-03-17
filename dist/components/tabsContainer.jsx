'use client';
import React from 'react';
export default function TabsContainer(_a) {
    var children = _a.children;
    var tabCount = React.Children.count(children);
    return (<div className={"\n        flex space-x-2 p-1 rounded-[12px]\n        ".concat(tabCount > 0 ? 'bg-light-background-accent200 dark:bg-dark-background-accent200' : 'bg-transparent', "\n      ")}>
      {children}
    </div>);
}
