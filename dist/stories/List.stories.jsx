import React from "react";
import List from "../components/list";
var items = [
    "Short item",
    "A longer item that is long enough to wrap onto a second line in a narrow column, to show the marker staying put.",
    "Last item",
];
var meta = {
    title: "Components/List",
    component: List,
    args: { items: items },
    argTypes: {
        marker: { control: "select", options: ["none", "dot", "number"] },
        size: { control: "select", options: ["body1", "body2"] },
        tone: { control: "select", options: ["primary", "secondary"] },
    },
    decorators: [
        function (Story) { return (<div style={{ width: "280px", padding: "16px" }}>
        <Story />
      </div>); },
    ],
};
export default meta;
export var None = { args: { marker: "none" } };
export var Dot = { args: { marker: "dot" } };
export var Number = { args: { marker: "number" } };
export var SecondaryDot = { args: { marker: "dot", tone: "secondary" } };
