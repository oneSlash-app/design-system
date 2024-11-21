'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect, useCallback } from 'react';
export default function IconButton(_a) {
    var _this = this;
    var variant = _a.variant, color = _a.color, state = _a.state, iconName = _a.iconName, onClick = _a.onClick;
    var _b = useState(false), isHovered = _b[0], setIsHovered = _b[1];
    var _c = useState(null), Icon = _c[0], setIcon = _c[1];
    // import icon
    var loadIcon = useCallback(function (iconName) { return __awaiter(_this, void 0, void 0, function () {
        var module_1, Icon_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!iconName)
                        return [2 /*return*/, null];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, import('@heroicons/react/24/outline')];
                case 2:
                    module_1 = _a.sent();
                    Icon_1 = module_1[iconName];
                    return [2 /*return*/, Icon_1 || null];
                case 3:
                    error_1 = _a.sent();
                    console.error("Failed to load icon ".concat(iconName, ":"), error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    // Load icons on mount and when props change
    useEffect(function () {
        var fetchIcons = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof iconName === 'string')) return [3 /*break*/, 2];
                        _a = setIcon;
                        return [4 /*yield*/, loadIcon(iconName)];
                    case 1:
                        _a.apply(void 0, [_b.sent()]);
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        fetchIcons();
    }, [iconName, loadIcon]);
    // padding, corner
    var baseClasses = variant === 'contained'
        ? 'p-2 rounded-[8px] leading-none '
        : 'p-2 rounded-[8px] leading-none ';
    // bg color
    var bgColor = variant === 'contained'
        ? color === 'primary'
            ? 'bg-light-primary-main dark:bg-dark-primary-main' // contained && primary
            : 'bg-light-background-accent200 dark:bg-dark-background-accent200' // contained && secondary
        : color === 'primary'
            ? ' ' // textOnly && primary
            : ' '; // textOnly && secondary
    // bg color hover
    var bgColorHover = variant === 'contained'
        ? color === 'primary'
            ? 'hover:bg-light-primary-dark hover:dark:bg-dark-primary-dark' // contained && primary
            : 'hover:bg-light-background-accent300 hover:dark:bg-dark-background-accent300' // contained && secondary
        : color === 'primary'
            ? 'hover:bg-light-action-hover hover:dark:bg-dark-action-hover' // textOnly && primary
            : 'hover:bg-light-action-hover hover:dark:bg-dark-action-hover'; // textOnly && secondary
    // icon color
    var iconColor = variant === 'contained'
        ? color === 'primary'
            ? 'text-light-primary-contrast dark:text-dark-primary-contrast' // contained && primary
            : 'text-light-text-primary dark:text-dark-text-primary' // contained && secondary
        : color === 'primary'
            ? ' text-light-text-primary dark:text-dark-text-primary' // textOnly && primary
            : ' text-light-text-primary dark:text-dark-text-primary'; // textOnly && secondary
    // state
    var stateClasses = state === 'disabled'
        ? 'cursor-not-allowed opacity-50'
        : state === 'selected'
            ? 'cursor-pointer ring-2 ring-offset-2 ring-blue-500'
            : isHovered
                ? 'cursor-pointer hover:bg-opacity-75'
                : 'cursor-pointer';
    return (<button className={"".concat(baseClasses, " ").concat(bgColor, " ").concat(iconColor, " ").concat(bgColorHover, " ").concat(stateClasses, " transition-colors duration-300 ease-in-out")} disabled={state === 'disabled'} onMouseEnter={function () { return setIsHovered(true); }} onMouseLeave={function () { return setIsHovered(false); }} onClick={onClick}>
        {Icon && <Icon className="size-6"/>}
    </button>);
}
