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
