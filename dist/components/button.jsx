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
export default function Button(_a) {
    var _this = this;
    var size = _a.size, type = _a.type, state = _a.state, label = _a.label, secondLabel = _a.secondLabel, decoIcon = _a.decoIcon, actionIcon = _a.actionIcon, onClickButton = _a.onClickButton, onClickActionIcon = _a.onClickActionIcon, _b = _a.className, className = _b === void 0 ? '' : _b;
    var _c = useState(false), isHovered = _c[0], setIsHovered = _c[1];
    var _d = useState(null), IconLeft = _d[0], setIconLeft = _d[1];
    var _e = useState(null), IconRight = _e[0], setIconRight = _e[1];
    var loadIcon = useCallback(function (iconName) { return __awaiter(_this, void 0, void 0, function () {
        var module_1, Icon, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!iconName)
                        return [2 /*return*/, null];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, import('lucide-react')];
                case 2:
                    module_1 = _a.sent();
                    Icon = module_1[iconName];
                    return [2 /*return*/, Icon || null];
                case 3:
                    error_1 = _a.sent();
                    console.error("Failed to load icon ".concat(iconName, ":"), error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    useEffect(function () {
        var fetchIcons = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!decoIcon) return [3 /*break*/, 2];
                        _a = setIconLeft;
                        return [4 /*yield*/, loadIcon(decoIcon)];
                    case 1:
                        _a.apply(void 0, [_c.sent()]);
                        _c.label = 2;
                    case 2:
                        if (!actionIcon) return [3 /*break*/, 4];
                        _b = setIconRight;
                        return [4 /*yield*/, loadIcon(actionIcon)];
                    case 3:
                        _b.apply(void 0, [_c.sent()]);
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchIcons();
    }, [decoIcon, actionIcon, loadIcon]);
    var sizeClasses = {
        large: 'text-body1 p-2',
        medium: 'text-body1 p-1',
        small: 'text-body2 p-1',
    }[size];
    var sizeIcon = {
        large: 'w-6 h-6',
        medium: 'w-5 h-5',
        small: 'w-4 h-4',
    }[size];
    var baseTypeClasses = {
        primary: 'bg-light-accent-main dark:bg-dark-accent-main text-light-text-primary dark:text-dark-text-contrast',
        secondary: 'bg-light-secondary-main dark:bg-dark-secondary-main text-light-text-primary dark:text-dark-text-primary',
        tertiary: 'bg-light-background-accent100 dark:bg-dark-background-accent100 text-light-text-primary dark:text-dark-text-primary',
        textOnly: 'text-light-text-primary dark:text-dark-text-primary',
    }[type];
    var hoverTypeClasses = {
        primary: 'hover:bg-light-accent-dark hover:dark:bg-dark-accent-dark',
        secondary: 'hover:bg-light-secondary-dark dark:hover:bg-dark-secondary-dark',
        tertiary: 'hover:bg-light-background-accent200 hover:dark:bg-dark-background-accent200',
        textOnly: 'hover:bg-light-background-accent100 hover:dark:bg-dark-background-accent100',
    }[type];
    var stateClasses = {
        enabled: 'cursor-pointer',
        focused: 'ring-2 ring-offset-4 ring-offset-light-background-default dark:ring-offset-dark-background-default ring-light-accent-main dark:ring-dark-accent-main',
        disabled: type === 'textOnly'
            ? 'cursor-not-allowed text-light-text-disabled dark:text-dark-text-disabled bg-transparent'
            : 'cursor-not-allowed text-light-text-disabled dark:text-dark-text-disabled bg-light-actionBackground-disabled dark:bg-dark-actionBackground-disabled',
        selected: 'cursor-pointer bg-light-primary-dark dark:bg-dark-primary-dark text-light-text-contrast dark:text-dark-text-contrast',
    };
    var buttonClasses = "\n    flex flex-row items-center rounded-[8px] transition-colors duration-200 ease-in-out justify-between\n    ".concat(sizeClasses, "\n    ").concat(state === 'selected' ? stateClasses.selected : '', "\n    ").concat(state === 'enabled' ? baseTypeClasses : '', "\n    ").concat(state === 'focused' ? "".concat(baseTypeClasses, " ").concat(stateClasses.focused) : '', "\n    ").concat(state === 'disabled' ? stateClasses.disabled : '', "\n    ").concat(state !== 'disabled' && state !== 'selected' && isHovered ? hoverTypeClasses : '', "\n    ").concat(state === 'hovered' ? "".concat(baseTypeClasses, " ").concat(hoverTypeClasses) : '', "\n    ").concat(className, "\n  ");
    return (<button className={buttonClasses} onMouseEnter={function () { if (state !== 'disabled')
        setIsHovered(true); }} onMouseLeave={function () { if (state !== 'disabled')
        setIsHovered(false); }} onClick={onClickButton}>
      {/* Group IconLeft and label in a flex container for left alignment */}
      <div className="flex items-center">
        {IconLeft && <IconLeft className={sizeIcon} strokeWidth={2}/>}
        <div className="flex flex-col text-center px-2">
          <span className="whitespace-nowrap overflow-hidden truncate">{label}</span>
          {secondLabel && (<span className="whitespace-nowrap overflow-hidden truncate text-body2 opacity-70">{secondLabel}</span>)}
        </div>
      </div>
      {IconRight && (<div onClick={onClickActionIcon} className="cursor-pointer">
          <IconRight className={sizeIcon} strokeWidth={2}/>
        </div>)}
    </button>);
}
