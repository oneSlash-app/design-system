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
import React, { useState } from "react";
import Select from "../components/select";
var meta = {
    title: "Components/Select",
    component: Select,
    argTypes: {
        placeholder: { control: "text" },
        disabled: { control: "boolean" },
        multiple: { control: "boolean" },
        width: { control: "text" },
        decoIconName: { control: "text" },
    },
};
export default meta;
var SelectWrapper = function (args) {
    var _a = useState(args.value || ""), value = _a[0], setValue = _a[1];
    return <Select {...args} value={value} onChange={setValue}/>;
};
var MultiSelectWrapper = function (args) {
    var _a = useState(args.value || []), values = _a[0], setValues = _a[1];
    return <Select {...args} value={values} onChange={setValues}/>;
};
export var Default = {
    render: function (args) { return <SelectWrapper {...args}/>; },
    args: {
        placeholder: "Select an option",
        options: [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
        ],
        width: 200,
    },
};
export var WithIcons = {
    render: function (args) { return <SelectWrapper {...args}/>; },
    args: {
        placeholder: "Choose a status",
        options: [
            { value: "active", label: "Active", iconName: "CheckCircle" },
            { value: "pending", label: "Pending", iconName: "Clock" },
            { value: "inactive", label: "Inactive", iconName: "XCircle" },
        ],
        width: 200,
    },
};
export var WithDecoIcon = {
    render: function (args) { return <SelectWrapper {...args}/>; },
    args: {
        placeholder: "Select category",
        decoIconName: "Folder",
        options: [
            { value: "work", label: "Work" },
            { value: "personal", label: "Personal" },
            { value: "other", label: "Other" },
        ],
        width: 200,
    },
};
export var Disabled = {
    render: function (args) { return <SelectWrapper {...args}/>; },
    args: {
        placeholder: "Disabled select",
        disabled: true,
        options: [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
        ],
        width: 200,
    },
};
export var MultiSelect = {
    render: function (args) { return <MultiSelectWrapper {...args}/>; },
    args: {
        placeholder: "Select multiple",
        multiple: true,
        options: [
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "angular", label: "Angular" },
            { value: "svelte", label: "Svelte" },
        ],
        width: 250,
    },
};
// The list is portaled, so a clipping ancestor (overflow hidden/auto) must not cut it off.
export var InsideClippingContainer = {
    render: function (args) { return (<div className="overflow-hidden rounded-control border border-misc-divider p-4" style={{ width: 320, height: 120 }}>
      <SelectWrapper {...args}/>
    </div>); },
    play: function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
        var _c;
        var canvasElement = _b.canvasElement;
        return __generator(this, function (_d) {
            (_c = canvasElement.querySelector('[role="combobox"]')) === null || _c === void 0 ? void 0 : _c.click();
            return [2 /*return*/];
        });
    }); },
    args: {
        placeholder: "Select an option",
        options: [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
            { value: "option4", label: "Option 4" },
        ],
    },
};
