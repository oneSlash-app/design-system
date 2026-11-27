import React from "react";
import { ChevronDown, ChevronRight, ExternalLink, Plus, Star } from "lucide-react";
import Button from "../components/button";
var meta = {
    title: "Components/Button",
    component: Button,
    argTypes: {
        size: {
            control: "select",
            options: ["tiny", "small", "medium", "large"],
        },
        loading: { control: "boolean" },
        type: {
            control: "select",
            options: ["primary", "secondary", "tertiary", "textOnly"],
        },
        color: {
            control: "select",
            options: ["default", "danger"],
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
export var DangerPrimary = {
    args: {
        size: "medium",
        type: "primary",
        color: "danger",
        state: "enabled",
        label: "Delete Account",
        decoIcon: "Trash2",
    },
};
export var DangerSecondary = {
    args: {
        size: "medium",
        type: "secondary",
        color: "danger",
        state: "enabled",
        label: "Remove Item",
    },
};
export var DangerTertiary = {
    args: {
        size: "medium",
        type: "tertiary",
        color: "danger",
        state: "enabled",
        label: "Cancel",
    },
};
export var DangerTextOnly = {
    args: {
        size: "medium",
        type: "textOnly",
        color: "danger",
        state: "enabled",
        label: "Delete",
    },
};
export var DangerVariants = {
    render: function () { return (<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button size="medium" type="primary" color="danger" state="enabled" label="Primary"/>
      <Button size="medium" type="secondary" color="danger" state="enabled" label="Secondary"/>
      <Button size="medium" type="tertiary" color="danger" state="enabled" label="Tertiary"/>
      <Button size="medium" type="textOnly" color="danger" state="enabled" label="Text Only"/>
    </div>); },
};
export var Loading = {
    render: function () { return (<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button size="large" type="primary" state="enabled" label="Saving" loading/>
      <Button size="medium" type="secondary" state="enabled" label="Saving" loading/>
      <Button size="small" type="tertiary" state="enabled" label="Saving" loading/>
      <Button size="tiny" type="textOnly" state="enabled" label="Saving" loading/>
    </div>); },
};
// `aria-*`, `data-*`, `id` and `title` reach the <button>, so an app can mark a toggle
export var AriaExpanded = {
    args: {
        size: "medium",
        type: "secondary",
        state: "enabled",
        label: "Filters",
        actionIcon: "ChevronDown",
        id: "filters-trigger",
        title: "Show filters",
        "aria-expanded": false,
        "aria-controls": "filters-panel",
        "data-testid": "filters-trigger",
    },
};
// An icon can be a component or an element instead of a name. A component is sized like a
// named icon and only that icon is bundled. So is an element without a className (what a
// Server Component passes); an element with a className is rendered as given.
export var IconComponents = {
    render: function () { return (<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button size="medium" type="primary" state="enabled" label="Component" decoIcon={Star} actionIcon={ChevronRight}/>
      <Button size="medium" type="secondary" state="enabled" label="By name" decoIcon="Star" actionIcon="ChevronRight"/>
      <Button size="medium" type="tertiary" state="enabled" label="Element" decoIcon={<span className="w-5 h-5 rounded-full bg-accent-main flex-shrink-0"/>}/>
      <Button size="medium" type="tertiary" state="enabled" label="Icon element" decoIcon={<Star />} actionIcon={<ChevronRight />}/>
    </div>); },
};
// `href` renders a link with the button's look: next/link for a path, a plain <a> for another site
export var AsLink = {
    render: function () { return (<div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button size="medium" type="primary" state="enabled" label="Internal link" href="/gallery"/>
      <Button size="medium" type="secondary" state="enabled" label="New tab" href="https://example.com" openInNewTab actionIcon={ExternalLink}/>
      <Button size="medium" type="tertiary" state="disabled" label="Disabled link" href="/gallery"/>
    </div>); },
};
// `htmlType="submit"` makes the button submit its form, so Enter in a field submits too
export var Submit = {
    render: function () { return (<form onSubmit={function (e) { return e.preventDefault(); }} style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button size="medium" type="primary" state="enabled" label="Save" htmlType="submit"/>
      <Button size="medium" type="tertiary" state="enabled" label="Reset" htmlType="reset"/>
    </form>); },
};
// Stretched, a lone label (with or without a deco icon) is centered. With an action icon the
// label stays at the start and the icon sits at the far edge.
export var FullWidth = {
    render: function () { return (<div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "320px" }}>
      <Button size="medium" type="primary" state="enabled" label="Continue" className="w-full"/>
      <Button size="medium" type="secondary" state="enabled" label="Add item" decoIcon={Plus} className="w-full"/>
      <Button size="medium" type="tertiary" state="enabled" label="Filters" actionIcon={ChevronDown} className="w-full"/>
      <Button size="medium" type="primary" state="enabled" label="Link, full width" href="/gallery" className="w-full"/>
      <Button size="medium" type="primary" state="enabled" label="Link, fits content" href="/gallery"/>
    </div>); },
};
