'use client';
import React, { useState, useRef, useEffect } from 'react';
export default function Tooltip(_a) {
    var title = _a.title, children = _a.children, placement = _a.placement;
    var _b = useState(false), visible = _b[0], setVisible = _b[1];
    var _c = useState(placement !== null && placement !== void 0 ? placement : 'bottom'), position = _c[0], setPosition = _c[1];
    var tooltipRef = useRef(null);
    var buttonRef = useRef(null);
    useEffect(function () {
        var handlePosition = function () {
            if (tooltipRef.current && buttonRef.current) {
                var tooltipRect = tooltipRef.current.getBoundingClientRect();
                var buttonRect = buttonRef.current.getBoundingClientRect();
                // If placement is forced, skip auto-detection
                if (placement) {
                    setPosition(placement);
                }
                else if (window.innerHeight - buttonRect.bottom < tooltipRect.height + 8) {
                    setPosition('top');
                }
                else {
                    setPosition('bottom');
                }
            }
        };
        if (visible) {
            handlePosition();
        }
    }, [visible, placement]);
    var handleClick = function () {
        setVisible(false); // Hide tooltip on click
    };
    return (<div ref={buttonRef} onMouseEnter={function () { return setVisible(true); }} onMouseLeave={function () { return setVisible(false); }} onClick={handleClick} className="relative inline-block">
      {children}
      {visible && (<div ref={tooltipRef} className={"absolute whitespace-nowrap text-caption rounded-[8px] py-1 px-2 z-50\n              dark:bg-light-background-accent300 bg-dark-background-accent300 \n              dark:text-light-text-primary text-dark-text-primary\n\t\t\t\t\t\t\t".concat(position === 'bottom' ? 'mt-1' : 'mb-1')} style={{
                bottom: position === 'top' ? '100%' : undefined,
                top: position === 'bottom' ? '100%' : undefined,
                left: '50%',
                transform: 'translateX(-50%)',
            }}>
            {title}
          </div>)}
    </div>);
}
