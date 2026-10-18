'use client';
import React, { useState, useRef, useLayoutEffect } from 'react';
var VIEWPORT_MARGIN = 8;
export default function Tooltip(_a) {
    var title = _a.title, children = _a.children, placement = _a.placement;
    var _b = useState(false), visible = _b[0], setVisible = _b[1];
    var _c = useState(placement !== null && placement !== void 0 ? placement : 'bottom'), position = _c[0], setPosition = _c[1];
    var _d = useState(0), shiftX = _d[0], setShiftX = _d[1];
    var tooltipRef = useRef(null);
    var buttonRef = useRef(null);
    useLayoutEffect(function () {
        if (!visible)
            return;
        var handlePosition = function () {
            if (tooltipRef.current && buttonRef.current) {
                var tooltipRect = tooltipRef.current.getBoundingClientRect();
                var buttonRect = buttonRef.current.getBoundingClientRect();
                // If placement is forced, skip auto-detection
                if (placement) {
                    setPosition(placement);
                }
                else {
                    var spaceBelow = window.innerHeight - buttonRect.bottom;
                    var fitsBelow = spaceBelow >= tooltipRect.height + VIEWPORT_MARGIN;
                    var fitsAbove = buttonRect.top >= tooltipRect.height + VIEWPORT_MARGIN;
                    setPosition(!fitsBelow && fitsAbove ? 'top' : 'bottom');
                }
                // Keep the tooltip inside the viewport horizontally
                var centerX = buttonRect.left + buttonRect.width / 2;
                var half = tooltipRect.width / 2;
                var minCenter = VIEWPORT_MARGIN + half;
                var maxCenter = window.innerWidth - VIEWPORT_MARGIN - half;
                setShiftX(Math.min(Math.max(centerX, minCenter), maxCenter) - centerX);
            }
        };
        handlePosition();
        window.addEventListener('resize', handlePosition);
        window.addEventListener('scroll', handlePosition, true);
        return function () {
            window.removeEventListener('resize', handlePosition);
            window.removeEventListener('scroll', handlePosition, true);
        };
    }, [visible, placement, title]);
    var handleClick = function () {
        setVisible(false); // Hide tooltip on click
    };
    return (<div ref={buttonRef} onMouseEnter={function () { return setVisible(true); }} onMouseLeave={function () { return setVisible(false); }} onClick={handleClick} className="relative inline-block">
      {children}
      {visible && (<div ref={tooltipRef} className={"absolute whitespace-nowrap text-caption rounded-[8px] py-1 px-2 z-50\n              dark:bg-light-background-accent300 bg-dark-background-accent300 \n              dark:text-light-text-primary text-dark-text-primary\n\t\t\t\t\t\t\t".concat(position === 'bottom' ? 'mt-1' : 'mb-1')} style={{
                bottom: position === 'top' ? '100%' : undefined,
                top: position === 'bottom' ? '100%' : undefined,
                left: '50%',
                transform: "translateX(calc(-50% + ".concat(shiftX, "px))"),
            }}>
            {title}
          </div>)}
    </div>);
}
