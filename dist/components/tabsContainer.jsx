'use client';
import React, { createContext, useLayoutEffect, useRef, useState } from 'react';
// Lets a Tab know a container draws its selected background (the sliding pill)
export var TabsContainerContext = createContext(false);
export default function TabsContainer(_a) {
    var children = _a.children;
    var tabCount = React.Children.count(children);
    var containerRef = useRef(null);
    var selectedRef = useRef(null);
    var _b = useState(null), indicator = _b[0], setIndicator = _b[1];
    useLayoutEffect(function () {
        var _a;
        var container = containerRef.current;
        if (!container)
            return;
        var update = function () {
            var selected = container.querySelector('[data-tab-selected="true"]');
            if (!selected) {
                selectedRef.current = null;
                setIndicator(null);
                return;
            }
            setIndicator(function (prev) { return ({
                animate: prev !== null,
                x: selected.offsetLeft,
                y: selected.offsetTop,
                width: selected.offsetWidth,
                height: selected.offsetHeight,
            }); });
            // Tabs scroll horizontally instead of wrapping; keep a newly selected tab in view
            if (selected !== selectedRef.current) {
                selectedRef.current = selected;
                var left = selected.offsetLeft;
                var right = left + selected.offsetWidth;
                if (left < container.scrollLeft) {
                    container.scrollTo({ left: left - 4, behavior: 'smooth' });
                }
                else if (right > container.scrollLeft + container.clientWidth) {
                    container.scrollTo({ left: right - container.clientWidth + 4, behavior: 'smooth' });
                }
            }
        };
        update();
        // Tab widths change once web fonts load
        (_a = document.fonts) === null || _a === void 0 ? void 0 : _a.ready.then(update);
        var resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(container);
        Array.from(container.children).forEach(function (child) { return resizeObserver.observe(child); });
        var mutationObserver = new MutationObserver(update);
        mutationObserver.observe(container, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['data-tab-selected'],
        });
        return function () {
            resizeObserver.disconnect();
            mutationObserver.disconnect();
        };
    }, [children]);
    return (<TabsContainerContext.Provider value={true}>
      <div ref={containerRef} role="tablist" onKeyDown={function (e) {
            var _a, _b;
            // Arrow keys move focus to the next tab and select it
            var tabs = Array.from((_b = (_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.querySelectorAll('[role="tab"]')) !== null && _b !== void 0 ? _b : []);
            var current = tabs.indexOf(document.activeElement);
            if (current === -1)
                return;
            var next = {
                ArrowRight: Math.min(current + 1, tabs.length - 1),
                ArrowLeft: Math.max(current - 1, 0),
                Home: 0,
                End: tabs.length - 1,
            }[e.key];
            if (next === undefined)
                return;
            e.preventDefault();
            tabs[next].focus();
            tabs[next].click();
        }} className={"\n          relative flex gap-0.5 p-1 rounded-container overflow-x-auto\n          ".concat(tabCount > 0 ? 'bg-background-accent100' : 'bg-transparent', "\n        ")} style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
        }}>
        {indicator && (<span aria-hidden className={"absolute rounded-control pointer-events-none bg-primary-dark\n              ".concat(indicator.animate ? 'transition-[transform,width,height] duration-[var(--os-duration-slide)] ease-emphasized motion-reduce:transition-none' : '')} style={{
                top: 0,
                left: 0,
                transform: "translate(".concat(indicator.x, "px, ").concat(indicator.y, "px)"),
                width: indicator.width,
                height: indicator.height,
            }}/>)}
        {children}
      </div>
    </TabsContainerContext.Provider>);
}
