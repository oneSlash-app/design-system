import React, { useState } from "react";
import TextField from "../components/textField";
var meta = {
    title: "Components/TextField",
    component: TextField,
    argTypes: {
        label: { control: "text" },
        disabled: { control: "boolean" },
        error: { control: "boolean" },
        required: { control: "boolean" },
        multiline: { control: "boolean" },
        maxRows: { control: "number" },
        size: {
            control: "select",
            options: ["large", "medium", "small"],
        },
        type: {
            control: "select",
            options: ["text", "password", "email", "number", "tel", "url", "search"],
        },
    },
};
export default meta;
var TextFieldWrapper = function (args) {
    var _a = useState(args.value || ""), value = _a[0], setValue = _a[1];
    return (<TextField {...args} value={value} onChange={function (e) { return setValue(e.target.value); }}/>);
};
export var Default = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "default-textfield",
        label: "Label",
        value: "",
        size: "medium",
    },
};
export var WithValue = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "with-value-textfield",
        label: "Name",
        value: "John Doe",
        size: "medium",
    },
};
export var Disabled = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "disabled-textfield",
        label: "Disabled Field",
        value: "Cannot edit",
        disabled: true,
        size: "medium",
    },
};
export var WithError = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "error-textfield",
        label: "Required Field",
        value: "",
        error: true,
        size: "medium",
    },
};
export var LargeSize = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "large-textfield",
        label: "Large Input",
        value: "",
        size: "large",
    },
};
export var SmallSize = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "small-textfield",
        label: "Small Input",
        value: "",
        size: "small",
    },
};
export var Multiline = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "multiline-textfield",
        label: "Description",
        value: "",
        multiline: true,
        maxRows: 4,
        size: "medium",
    },
};
export var AllSizes = {
    render: function () { return (<div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
      <TextFieldWrapper id="size-small" label="Small" size="small"/>
      <TextFieldWrapper id="size-medium" label="Medium" size="medium"/>
      <TextFieldWrapper id="size-large" label="Large" size="large"/>
    </div>); },
};
export var Email = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "email-textfield",
        label: "Email",
        value: "",
        type: "email",
        placeholder: "you@example.com",
        size: "medium",
    },
};
export var Password = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "password-textfield",
        label: "Password",
        value: "",
        type: "password",
        placeholder: "Enter your password",
        size: "medium",
    },
};
export var Required = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "required-textfield",
        label: "Username",
        value: "",
        required: true,
        placeholder: "Required field",
        size: "medium",
    },
};
export var Number = {
    render: function (args) { return <TextFieldWrapper {...args}/>; },
    args: {
        id: "number-textfield",
        label: "Phone Number",
        value: "",
        type: "tel",
        placeholder: "123-456-7890",
        size: "medium",
    },
};
