'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useEffect, useReducer, useRef, useState, useSyncExternalStore } from 'react';
import Alert from './alert';
var DEFAULT_DURATION_MS = 5000;
var MAX_VISIBLE = 3;
// Matches Alert's exit transition
var EXIT_MS = 150;
// The longest delay setTimeout can hold; a longer one fires at once
var MAX_TIMEOUT_MS = Math.pow(2, 31) - 1;
// Pure helpers. The state lists toasts newest first.
export function addToast(state, input, id) {
    var _a = typeof input === 'string' ? { message: input } : input, _b = _a.type, type = _b === void 0 ? 'default' : _b, message = _a.message, secondMessage = _a.secondMessage, duration = _a.duration;
    var wanted = duration !== undefined ? duration : type === 'error' ? null : DEFAULT_DURATION_MS;
    var item = { id: id, type: type, message: message, secondMessage: secondMessage, duration: wanted !== null && Number.isFinite(wanted) && wanted <= MAX_TIMEOUT_MS ? wanted : null };
    return __spreadArray([item], state, true);
}
export function removeToast(state, id) {
    return state.some(function (t) { return t.id === id; }) ? state.filter(function (t) { return t.id !== id; }) : state;
}
// The three oldest are shown, newest on top; the rest wait for room
export function visibleToasts(state) {
    return state.slice(-MAX_VISIBLE);
}
export function pauseReducer(state, event) {
    switch (event) {
        case 'pointerEnter': return __assign(__assign({}, state), { hovered: true });
        case 'pointerLeave': return __assign(__assign({}, state), { hovered: false });
        case 'focus': return __assign(__assign({}, state), { focused: true });
        case 'blur': return __assign(__assign({}, state), { focused: false });
    }
}
export var isPaused = function (_a) {
    var hovered = _a.hovered, focused = _a.focused;
    return hovered || focused;
};
var store = { toasts: [], mounts: [] };
var serverStore = { toasts: [], mounts: [] };
var listeners = new Set();
var nextId = 0;
var setStore = function (next) {
    store = next;
    listeners.forEach(function (l) { return l(); });
};
var subscribe = function (listener) {
    listeners.add(listener);
    return function () { return listeners.delete(listener); };
};
/** Shows a toast and returns its id. Call it from client code (event handlers and effects), not from a Server Component or a server action. */
export function toast(input) {
    var id = "toast-".concat(++nextId);
    // During a server render there is no Toaster to show it, and the store would outlive the request
    if (typeof window === 'undefined')
        return id;
    setStore(__assign(__assign({}, store), { toasts: addToast(store.toasts, input, id) }));
    return id;
}
export function dismissToast(id) {
    var toasts = removeToast(store.toasts, id);
    if (toasts !== store.toasts)
        setStore(__assign(__assign({}, store), { toasts: toasts }));
}
function Toast(_a) {
    var item = _a.item;
    var _b = useState(true), open = _b[0], setOpen = _b[1];
    var _c = useReducer(pauseReducer, { hovered: false, focused: false }), pause = _c[0], dispatch = _c[1];
    var paused = isPaused(pause);
    var remainingMs = useRef(item.duration);
    useEffect(function () {
        if (!open || paused || remainingMs.current === null)
            return;
        var startedAt = Date.now();
        var timer = setTimeout(function () { return setOpen(false); }, remainingMs.current);
        return function () {
            clearTimeout(timer);
            if (remainingMs.current !== null)
                remainingMs.current -= Date.now() - startedAt;
        };
    }, [open, paused]);
    // Let the alert fade out, then take the toast out of the store
    useEffect(function () {
        if (open)
            return;
        var timer = setTimeout(function () { return dismissToast(item.id); }, EXIT_MS);
        return function () { return clearTimeout(timer); };
    }, [open, item.id]);
    return (<div className="pointer-events-auto" onMouseEnter={function () { return dispatch('pointerEnter'); }} onMouseLeave={function () { return dispatch('pointerLeave'); }} onFocus={function () { return dispatch('focus'); }} 
    // Focus moving to another element inside the same toast has not left it
    onBlur={function (e) { if (!e.currentTarget.contains(e.relatedTarget))
        dispatch('blur'); }}>
      <Alert variant="inline" showCloseButton autoDismiss={false} open={open} type={item.type} message={item.message} secondMessage={item.secondMessage} onClose={function () { return dismissToast(item.id); }}/>
    </div>);
}
// Mount once near the app root. A second Toaster renders nothing.
export default function Toaster() {
    var _a = useSyncExternalStore(subscribe, function () { return store; }, function () { return serverStore; }), toasts = _a.toasts, mounts = _a.mounts;
    var me = useState(function () { return Symbol('Toaster'); })[0];
    useEffect(function () {
        setStore(__assign(__assign({}, store), { mounts: __spreadArray(__spreadArray([], store.mounts, true), [me], false) }));
        return function () { return setStore(__assign(__assign({}, store), { mounts: store.mounts.filter(function (m) { return m !== me; }) })); };
    }, [me]);
    if (mounts[0] !== me)
        return null;
    var shown = visibleToasts(toasts);
    if (shown.length === 0)
        return null;
    // Above modals; the column lets clicks through beside and between the toasts
    return (<div className="fixed top-4 inset-x-0 z-[var(--os-z-tooltip)] flex justify-center px-4 pointer-events-none">
      <div className="flex flex-col gap-2 w-full max-w-md">
        {shown.map(function (item) { return <Toast key={item.id} item={item}/>; })}
      </div>
    </div>);
}
