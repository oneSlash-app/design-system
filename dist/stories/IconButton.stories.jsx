import React from "react";
import { Plus, Settings } from "lucide-react";
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
// `icon` takes a component or an element instead of a name: only that icon is bundled.
// There is no name to read out, so pass `ariaLabel`.
export var IconComponent = {
    render: function () { return (<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <IconButton color="primary" state="enabled" size="medium" icon={Plus} ariaLabel="Add"/>
      <IconButton color="tertiary" state="enabled" size="medium" icon={Settings} ariaLabel="Settings"/>
      <IconButton color="iconOnly" state="enabled" size="medium" icon={<span className="size-6 rounded-full bg-accent-main"/>} ariaLabel="Account"/>
    </div>); },
};
// `href` renders a link with the icon button's look
export var AsLink = {
    render: function () { return (<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <IconButton color="tertiary" state="enabled" size="small" icon={Settings} ariaLabel="Settings" href="/settings"/>
      <IconButton color="primary" state="enabled" size="medium" iconName="ExternalLink" ariaLabel="Open example.com" href="https://example.com" openInNewTab/>
      <IconButton color="secondary" state="disabled" size="medium" iconName="Settings" href="/settings"/>
    </div>); },
};
