import React, { useState } from "react";
import Textarea from "../components/textarea";
var meta = {
    title: "Components/Textarea",
    component: Textarea,
    argTypes: {
        label: { control: "text" },
        disabled: { control: "boolean" },
        error: { control: "boolean" },
        maxRows: { control: "number" },
        size: {
            control: "select",
            options: ["medium", "small"],
        },
    },
};
export default meta;
var TextareaWrapper = function (args) {
    var _a = useState(args.value || ""), value = _a[0], setValue = _a[1];
    return (<Textarea {...args} value={value} onChange={function (e) { return setValue(e.target.value); }}/>);
};
export var Default = {
    render: function (args) { return <TextareaWrapper {...args}/>; },
    args: {
        id: "default-textarea",
        label: "Description",
        value: "",
        size: "medium",
    },
};
export var WithValue = {
    render: function (args) { return <TextareaWrapper {...args}/>; },
    args: {
        id: "with-value-textarea",
        label: "Notes",
        value: "This is some sample text that demonstrates the textarea component.",
        size: "medium",
    },
};
export var Disabled = {
    render: function (args) { return <TextareaWrapper {...args}/>; },
    args: {
        id: "disabled-textarea",
        label: "Disabled",
        value: "This textarea is disabled",
        disabled: true,
        size: "medium",
    },
};
export var WithError = {
    render: function (args) { return <TextareaWrapper {...args}/>; },
    args: {
        id: "error-textarea",
        label: "Required Field",
        value: "",
        error: true,
        size: "medium",
    },
};
export var SmallSize = {
    render: function (args) { return <TextareaWrapper {...args}/>; },
    args: {
        id: "small-textarea",
        label: "Small Textarea",
        value: "",
        size: "small",
    },
};
export var AutoExpanding = {
    render: function (args) { return <TextareaWrapper {...args}/>; },
    args: {
        id: "auto-expand-textarea",
        label: "Type to see auto-expansion (max 6 rows)",
        value: "",
        maxRows: 6,
        size: "medium",
    },
};
export var AllSizes = {
    render: function () { return (<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
      <TextareaWrapper id="size-small" label="Small" size="small"/>
      <TextareaWrapper id="size-medium" label="Medium" size="medium"/>
    </div>); },
};
