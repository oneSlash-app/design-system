'use client';
import React from 'react';
// The whole icon set, so an icon can be found by name. Only `iconSlot` loads this file, and
// only with a dynamic import, so the set stays out of an app's main bundle.
import * as LucideIcons from 'lucide-react';
export default function NamedIcon(_a) {
    var name = _a.name, className = _a.className, strokeWidth = _a.strokeWidth, size = _a.size, warnIfMissing = _a.warnIfMissing;
    var Icon = LucideIcons[name];
    if (!Icon) {
        if (warnIfMissing)
            console.warn("Icon \"".concat(name, "\" not found in Lucide icons"));
        return null;
    }
    return <Icon className={className} strokeWidth={strokeWidth} {...(size !== undefined ? { size: size } : {})}/>;
}
