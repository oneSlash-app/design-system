import React from "react";
import PageHeader from "../components/pageHeader";
var meta = {
    title: "Components/PageHeader",
    component: PageHeader,
    args: {
        eyebrow: "Design Translation · 2011",
        title: "Geocentric Clock",
        lede: "The arm stays still and the numbers come to it.",
    },
    argTypes: {
        level: { control: "select", options: [1, 2, 3] },
    },
    decorators: [
        function (Story) { return (<div style={{ padding: "16px" }}>
        <Story />
      </div>); },
    ],
};
export default meta;
export var Default = {};
/** Renders an h2; the type style is the same as the default. */
export var Level2 = { args: { level: 2 } };
