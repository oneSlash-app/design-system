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
import { useRouter, usePathname } from 'next/navigation';
export default function Tab(_a) {
    var _this = this;
    var label = _a.label, href = _a.href, isSelected = _a.isSelected, onClickTab = _a.onClickTab, onClickActionIcon = _a.onClickActionIcon, decoIcon = _a.decoIcon, actionIcon = _a.actionIcon;
    var router = useRouter();
    var pathname = usePathname();
    var _b = useState(null), IconLeft = _b[0], setIconLeft = _b[1];
    var _c = useState(null), IconRight = _c[0], setIconRight = _c[1];
    // Load icon dynamically
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
    var handleClick = function () {
        onClickTab();
        if (href) {
            router.push(href);
        }
    };
    return (<div className={"\n        flex items-center space-x-1 py-1 px-[6px] rounded-[8px] cursor-pointer justify-start transition-colors duration-200 ease-in-out\n        ".concat(isSelected
            ? 'bg-light-primary-dark dark:bg-dark-primary-dark text-light-text-contrast dark:text-dark-text-contrast'
            : 'hover:bg-light-background-accent200 dark:hover:bg-dark-background-accent200', "\n      ")} onClick={handleClick}>
      {IconLeft && <IconLeft className="w-6 h-6" strokeWidth={2}/>}
      <span className="whitespace-nowrap text-body1 px-[6px]">
        {label}
      </span>
      {IconRight && (<div onClick={onClickActionIcon} className="cursor-pointer">
          <IconRight className="w-6 h-6" strokeWidth={2}/>
        </div>)}
    </div>);
}
