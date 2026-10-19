'use client';
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LoadingSmall } from './loadingScreen';
import { focusRing, focusRingDanger, pressFeedback, stateTransition } from './sharedStyles';
export default function Button(_a) {
    var size = _a.size, type = _a.type, _b = _a.color, color = _b === void 0 ? 'default' : _b, state = _a.state, label = _a.label, secondLabel = _a.secondLabel, decoIcon = _a.decoIcon, actionIcon = _a.actionIcon, onClickButton = _a.onClickButton, onClickActionIcon = _a.onClickActionIcon, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.loading, loading = _d === void 0 ? false : _d, rest = __rest(_a, ["size", "type", "color", "state", "label", "secondLabel", "decoIcon", "actionIcon", "onClickButton", "onClickActionIcon", "className", "loading"]);
    // Synchronous lookup so icons render on the first paint
    var IconLeft = decoIcon ? LucideIcons[decoIcon] : null;
    var IconRight = actionIcon ? LucideIcons[actionIcon] : null;
    // Horizontal padding sits on the button so an icon and the label are inset equally
    var sizeClasses = {
        large: 'text-body1 py-2 px-3 gap-1',
        medium: 'text-body1 py-1 px-2 gap-1',
        small: 'text-body2 py-1 px-2 gap-1',
        tiny: 'text-caption py-px px-1 gap-0.5',
    }[size];
    var sizeIcon = {
        large: 'w-6 h-6',
        medium: 'w-5 h-5',
        small: 'w-4 h-4',
        tiny: 'w-3.5 h-3.5',
    }[size];
    // LoadingSmall sizes are 24/20/16px; pick the one closest to this size's icon
    var spinnerSize = { large: 'large', medium: 'small', small: 'tiny', tiny: 'tiny' }[size];
    var baseTypeClasses = {
        default: {
            primary: 'bg-accent-main text-accent-contrast',
            secondary: 'bg-secondary-main text-secondary-contrast',
            tertiary: 'bg-background-accent100 text-fg-primary',
            textOnly: 'text-fg-primary',
        },
        danger: {
            primary: 'bg-error-main text-error-contrast',
            secondary: 'bg-error-alertBg text-error-text',
            // Inset ring instead of a border so it adds no height
            tertiary: 'bg-transparent ring-1 ring-inset ring-error-main text-error-main',
            textOnly: 'text-error-main',
        },
    }[color][type];
    var hoverTypeClasses = {
        default: {
            primary: 'hover:bg-accent-dark',
            secondary: 'hover:bg-secondary-dark',
            tertiary: 'hover:bg-background-accent200',
            textOnly: 'hover:bg-background-accent100',
        },
        danger: {
            primary: 'hover:bg-error-dark',
            secondary: 'hover:bg-error-tint/60',
            tertiary: 'hover:bg-error-main/10',
            textOnly: 'hover:bg-error-main/10',
        },
    }[color][type];
    // Same outline as real keyboard focus (focusRing), so the demo state matches it and
    // paints no box behind a transparent textOnly button
    var focusedOutline = color === 'danger'
        ? 'outline outline-2 outline-offset-2 outline-error-main'
        : 'outline outline-2 outline-offset-2 outline-fg-primary';
    var stateClasses = {
        enabled: 'cursor-pointer',
        focused: focusedOutline,
        disabled: type === 'textOnly'
            ? 'cursor-not-allowed text-fg-disabled bg-transparent'
            : 'cursor-not-allowed text-fg-disabled bg-actionBackground-disabled',
        selected: 'cursor-pointer bg-primary-dark text-primary-contrast',
    };
    // Hover is pure CSS; `state="hovered"` and `state="focused"` only exist to show those states in docs
    var buttonClasses = "\n    flex flex-row items-center rounded-control justify-between ".concat(stateTransition, " ").concat(pressFeedback, "\n    ").concat(color === 'danger' ? focusRingDanger : focusRing, "\n    ").concat(sizeClasses, "\n    ").concat(state === 'selected' ? stateClasses.selected : '', "\n    ").concat(state === 'enabled' || state === 'hovered' ? "".concat(baseTypeClasses, " ").concat(loading ? 'cursor-wait' : "".concat(stateClasses.enabled, " ").concat(hoverTypeClasses)) : '', "\n    ").concat(state === 'focused' ? "".concat(baseTypeClasses, " ").concat(hoverTypeClasses, " ").concat(stateClasses.focused) : '', "\n    ").concat(state === 'disabled' ? stateClasses.disabled : '', "\n    ").concat(className, "\n  ");
    return (<button {...rest} type="button" className={buttonClasses} disabled={state === 'disabled' || loading} aria-busy={loading || undefined} onClick={onClickButton}>
      {/* Group IconLeft and label in a flex container for left alignment */}
      <div className={"flex items-center ".concat(size === 'tiny' ? 'gap-0.5' : 'gap-1')}>
        {loading ? (<LoadingSmall size={spinnerSize}/>) : (IconLeft && <IconLeft className={"".concat(sizeIcon, " flex-shrink-0")} strokeWidth={2}/>)}
        <div className={"flex flex-col text-center px-1"}>
          <span className="whitespace-nowrap overflow-hidden truncate">{label}</span>
          {secondLabel && (<span className={"whitespace-nowrap overflow-hidden truncate ".concat(size === 'tiny' ? 'text-caption' : 'text-body2', " opacity-70")}>{secondLabel}</span>)}
        </div>
      </div>
      {IconRight && (<span onClick={function (e) {
                // Don't also trigger the button's own click
                e.stopPropagation();
                onClickActionIcon === null || onClickActionIcon === void 0 ? void 0 : onClickActionIcon();
            }} className="cursor-pointer">
          <IconRight className={"".concat(sizeIcon, " flex-shrink-0")} strokeWidth={2}/>
        </span>)}
    </button>);
}
