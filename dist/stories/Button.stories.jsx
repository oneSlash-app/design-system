import Button from "../components/button";
var meta = {
    title: "Components/Button",
    component: Button,
    argTypes: {
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
        type: {
            control: "select",
            options: ["primary", "secondary", "tertiary", "textOnly"],
        },
        state: {
            control: "select",
            options: ["enabled", "hovered", "focused", "disabled", "selected"],
        },
        label: { control: "text" },
        decoIcon: { control: "text" },
        actionIcon: { control: "text" },
    },
};
export default meta;
export var Primary = {
    args: {
        size: "medium",
        type: "primary",
        state: "enabled",
        label: "Primary Button",
    },
};
export var Secondary = {
    args: {
        size: "medium",
        type: "secondary",
        state: "enabled",
        label: "Secondary Button",
    },
};
export var Tertiary = {
    args: {
        size: "medium",
        type: "tertiary",
        state: "enabled",
        label: "Tertiary Button",
    },
};
export var WithIcons = {
    args: {
        size: "medium",
        type: "primary",
        state: "enabled",
        label: "With Icons",
        decoIcon: "Star",
        actionIcon: "ChevronRight",
    },
};
export var Disabled = {
    args: {
        size: "medium",
        type: "primary",
        state: "disabled",
        label: "Disabled Button",
    },
};
export var Small = {
    args: {
        size: "small",
        type: "primary",
        state: "enabled",
        label: "Small Button",
    },
};
export var Large = {
    args: {
        size: "large",
        type: "primary",
        state: "enabled",
        label: "Large Button",
    },
};
export var Selected = {
    args: {
        size: "medium",
        type: "primary",
        state: "selected",
        label: "Selected Button",
    },
};
