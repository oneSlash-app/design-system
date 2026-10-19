import React from "react";
import IconButton from "../components/iconButton";
var meta = {
    title: "Components/IconButton",
    component: IconButton,
    argTypes: {
        color: {
            control: "select",
            options: ["primary", "secondary", "tertiary", "iconOnly"],
        },
        state: {
            control: "select",
            options: ["enabled", "selected", "disabled"],
        },
        size: {
            control: "select",
            options: ["large", "medium", "small", "tiny"],
        },
        iconName: { control: "text" },
        loading: { control: "boolean" },
    },
};
export default meta;
export var Primary = {
    args: {
        color: "primary",
        state: "enabled",
        size: "medium",
        iconName: "Plus",
    },
};
export var Secondary = {
    args: {
        color: "secondary",
        state: "enabled",
        size: "medium",
        iconName: "Settings",
    },
};
export var Tertiary = {
    args: {
        color: "tertiary",
        state: "enabled",
        size: "medium",
        iconName: "Search",
    },
};
export var IconOnly = {
    args: {
        color: "iconOnly",
        state: "enabled",
        size: "medium",
        iconName: "X",
    },
};
export var Selected = {
    args: {
        color: "primary",
        state: "selected",
        size: "medium",
        iconName: "Check",
    },
};
export var Disabled = {
    args: {
        color: "primary",
        state: "disabled",
        size: "medium",
        iconName: "Plus",
    },
};
export var Loading = {
    args: {
        color: "primary",
        state: "enabled",
        size: "medium",
        iconName: "RefreshCw",
        loading: true,
    },
};
export var AllSizes = {
    render: function () { return (<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <IconButton color="primary" state="enabled" size="tiny" iconName="Star"/>
      <IconButton color="primary" state="enabled" size="small" iconName="Star"/>
      <IconButton color="primary" state="enabled" size="medium" iconName="Star"/>
      <IconButton color="primary" state="enabled" size="large" iconName="Star"/>
    </div>); },
};
// `aria-*`, `data-*`, `id` and `title` reach the <button>, so an app can mark a toggle
export var AriaExpanded = {
    args: {
        color: "iconOnly",
        state: "enabled",
        size: "medium",
        iconName: "ChevronDown",
        ariaLabel: "Show details",
        id: "details-trigger",
        title: "Show details",
        "aria-expanded": true,
        "aria-controls": "details-panel",
        "data-testid": "details-trigger",
    },
};
