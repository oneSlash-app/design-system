import React from "react";
import Tag from "../components/tag";
var meta = {
    title: "Components/Tag",
    component: Tag,
    decorators: [
        function (Story) { return (<div style={{ display: "flex" }}>
        <Story />
      </div>); },
    ],
    argTypes: {
        variant: {
            control: "select",
            options: ["contained", "textOnly"],
        },
        size: {
            control: "select",
            options: ["medium", "small"],
        },
        state: {
            control: "select",
            options: ["enabled", "selected"],
        },
        color: {
            control: "select",
            options: [undefined, "default", "success", "warning", "error", "info"],
        },
        label: { control: "text" },
        iconName: { control: "text" },
    },
};
export default meta;
export var Contained = {
    args: {
        variant: "contained",
        size: "medium",
        state: "enabled",
        label: "Tag Label",
    },
};
export var TextOnly = {
    args: {
        variant: "textOnly",
        size: "medium",
        state: "enabled",
        label: "Text Tag",
    },
};
export var Selected = {
    args: {
        variant: "contained",
        size: "medium",
        state: "selected",
        label: "Selected",
    },
};
export var WithIcon = {
    args: {
        variant: "contained",
        size: "medium",
        state: "enabled",
        label: "With Icon",
        iconName: "Star",
    },
};
export var Small = {
    args: {
        variant: "contained",
        size: "small",
        state: "enabled",
        label: "Small Tag",
    },
};
export var Clickable = {
    args: {
        variant: "contained",
        size: "medium",
        state: "enabled",
        label: "Click me",
        onClick: function () { return alert("Tag clicked!"); },
    },
};
export var AllVariants = {
    render: function () { return (<div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
      <Tag variant="contained" size="medium" label="Contained"/>
      <Tag variant="textOnly" size="medium" label="Text Only"/>
      <Tag variant="contained" size="medium" state="selected" label="Selected"/>
      <Tag variant="contained" size="small" label="Small"/>
      <Tag variant="contained" size="medium" label="With Icon" iconName="Check"/>
    </div>); },
};
export var Success = {
    args: {
        variant: "contained",
        size: "medium",
        color: "success",
        label: "Success",
    },
};
export var Warning = {
    args: {
        variant: "contained",
        size: "medium",
        color: "warning",
        label: "Warning",
    },
};
export var Error = {
    args: {
        variant: "contained",
        size: "medium",
        color: "error",
        label: "Error",
    },
};
export var Info = {
    args: {
        variant: "contained",
        size: "medium",
        color: "info",
        label: "Info",
    },
};
export var AllColors = {
    render: function (args) { return (<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ width: "80px" }}>Contained:</span>
        <Tag variant="contained" size="medium" color="default" label="Default"/>
        <Tag variant="contained" size="medium" color="success" label="Success"/>
        <Tag variant="contained" size="medium" color="warning" label="Warning"/>
        <Tag variant="contained" size="medium" color="error" label="Error"/>
        <Tag variant="contained" size="medium" color="info" label="Info"/>
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ width: "80px" }}>Text Only:</span>
        <Tag variant="textOnly" size="medium" color="default" label="Default"/>
        <Tag variant="textOnly" size="medium" color="success" label="Success"/>
        <Tag variant="textOnly" size="medium" color="warning" label="Warning"/>
        <Tag variant="textOnly" size="medium" color="error" label="Error"/>
        <Tag variant="textOnly" size="medium" color="info" label="Info"/>
      </div>
    </div>); },
};
