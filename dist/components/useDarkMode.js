'use client';
import { useState, useEffect } from 'react';
var QUERY = '(prefers-color-scheme: dark)';
export function resolveDarkMode(classList, prefersDark, mode) {
    // The loaded theme file declares the mode it renders via --os-mode; it wins over the class/media rule.
    if (mode === 'dark')
        return true;
    if (mode === 'light')
        return false;
    if (classList.contains('dark'))
        return true;
    if (classList.contains('light'))
        return false;
    return prefersDark;
}
export default function useDarkMode() {
    var _a = useState(false), isDark = _a[0], setIsDark = _a[1];
    useEffect(function () {
        var el = document.documentElement;
        var mq = window.matchMedia ? window.matchMedia(QUERY) : null;
        var update = function () {
            return setIsDark(resolveDarkMode(el.classList, mq ? mq.matches : false, getComputedStyle(el).getPropertyValue('--os-mode').trim()));
        };
        var observer = new MutationObserver(update);
        observer.observe(el, { attributes: true, attributeFilter: ['class'] });
        mq === null || mq === void 0 ? void 0 : mq.addEventListener('change', update);
        update();
        return function () {
            observer.disconnect();
            mq === null || mq === void 0 ? void 0 : mq.removeEventListener('change', update);
        };
    }, []);
    return isDark;
}
