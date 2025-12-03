import React from "react";
import Link from "../components/link";
var meta = {
    title: "Components/Link",
    component: Link,
    argTypes: {
        href: { control: "text" },
        color: {
            control: "select",
            options: ["info", "error", "warning", "success"],
        },
        size: {
            control: "select",
            options: ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption"],
        },
        openInNewTab: { control: "boolean" },
    },
};
export default meta;
export var Info = {
    args: {
        href: "https://example.com",
        children: "Info Link",
        color: "info",
        size: "body1",
    },
};
export var Error = {
    args: {
        href: "https://example.com",
        children: "Error Link",
        color: "error",
        size: "body1",
    },
};
export var Warning = {
    args: {
        href: "https://example.com",
        children: "Warning Link",
        color: "warning",
        size: "body1",
    },
};
export var Success = {
    args: {
        href: "https://example.com",
        children: "Success Link",
        color: "success",
        size: "body1",
    },
};
export var AllColors = {
    render: function () { return (<div style={{ display: "flex", gap: "16px" }}>
      <Link href="https://example.com" color="info">Info</Link>
      <Link href="https://example.com" color="error">Error</Link>
      <Link href="https://example.com" color="warning">Warning</Link>
      <Link href="https://example.com" color="success">Success</Link>
    </div>); },
};
