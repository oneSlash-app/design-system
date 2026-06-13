'use client';
import { useState, useEffect } from 'react';
export default function useDarkMode() {
    var _a = useState(function () {
        if (typeof document === 'undefined')
            return false;
        return document.documentElement.classList.contains('dark');
    }), isDark = _a[0], setIsDark = _a[1];
    useEffect(function () {
        var el = document.documentElement;
        var observer = new MutationObserver(function () {
            setIsDark(el.classList.contains('dark'));
        });
        observer.observe(el, { attributes: true, attributeFilter: ['class'] });
        return function () { return observer.disconnect(); };
    }, []);
    return isDark;
}
