import React from "react";
import Icon from "../components/icon";
var meta = {
    title: "Components/Icon",
    component: Icon,
    argTypes: {
        name: {
            control: "text",
            description: "Lucide icon name",
        },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
        color: {
            control: "select",
            options: ["primary", "secondary", "disabled", "error", "warning", "success", "info", "accent", "inherit"],
        },
        strokeWidth: {
            control: { type: "range", min: 1, max: 4, step: 0.5 },
        },
    },
};
export default meta;
export var Default = {
    args: {
        name: "House",
        size: "medium",
        color: "primary",
    },
};
export var Small = {
    args: {
        name: "Settings",
        size: "small",
        color: "primary",
    },
};
export var Large = {
    args: {
        name: "Star",
        size: "large",
        color: "primary",
    },
};
export var CustomSize = {
    args: {
        name: "Heart",
        size: 48,
        color: "error",
    },
};
export var AllColors = {
    render: function (args) { return (<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Icon {...args} color="primary"/>
      <Icon {...args} color="secondary"/>
      <Icon {...args} color="disabled"/>
      <Icon {...args} color="error"/>
      <Icon {...args} color="warning"/>
      <Icon {...args} color="success"/>
      <Icon {...args} color="info"/>
      <Icon {...args} color="accent"/>
    </div>); },
    args: {
        name: "Circle",
        size: "large",
    },
};
export var AllSizes = {
    render: function (args) { return (<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Icon {...args} size="small"/>
      <Icon {...args} size="medium"/>
      <Icon {...args} size="large"/>
      <Icon {...args} size={48}/>
    </div>); },
    args: {
        name: "Star",
        color: "accent",
    },
};
export var CommonIcons = {
    render: function (args) { return (<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Icon {...args} name="House"/>
      <Icon {...args} name="Settings"/>
      <Icon {...args} name="User"/>
      <Icon {...args} name="Mail"/>
      <Icon {...args} name="Bell"/>
      <Icon {...args} name="Search"/>
      <Icon {...args} name="Heart"/>
      <Icon {...args} name="Star"/>
      <Icon {...args} name="Pencil"/>
      <Icon {...args} name="Trash2"/>
      <Icon {...args} name="Download"/>
      <Icon {...args} name="Upload"/>
      <Icon {...args} name="Share"/>
      <Icon {...args} name="Copy"/>
      <Icon {...args} name="Check"/>
      <Icon {...args} name="X"/>
      <Icon {...args} name="Plus"/>
      <Icon {...args} name="Minus"/>
      <Icon {...args} name="ChevronLeft"/>
      <Icon {...args} name="ChevronRight"/>
      <Icon {...args} name="ChevronUp"/>
      <Icon {...args} name="ChevronDown"/>
      <Icon {...args} name="ArrowLeft"/>
      <Icon {...args} name="ArrowRight"/>
      <Icon {...args} name="Info"/>
      <Icon {...args} name="CircleAlert"/>
      <Icon {...args} name="TriangleAlert"/>
      <Icon {...args} name="CircleCheck"/>
    </div>); },
    args: {
        size: "medium",
        color: "primary",
    },
};
export var StrokeWidths = {
    render: function (args) { return (<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Icon {...args} strokeWidth={1}/>
      <Icon {...args} strokeWidth={1.5}/>
      <Icon {...args} strokeWidth={2}/>
      <Icon {...args} strokeWidth={2.5}/>
      <Icon {...args} strokeWidth={3}/>
    </div>); },
    args: {
        name: "Heart",
        size: "large",
        color: "primary",
    },
};
