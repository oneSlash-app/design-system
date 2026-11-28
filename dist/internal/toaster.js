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
var DEFAULT_DURATION_MS = 5000;
var MAX_VISIBLE = 3;
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
