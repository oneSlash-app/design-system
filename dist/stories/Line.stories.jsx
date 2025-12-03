import React from "react";
import Line from "../components/line";
var meta = {
    title: "Components/Line",
    component: Line,
    argTypes: {
        direction: {
            control: "select",
            options: ["horizontal", "vertical"],
        },
    },
};
export default meta;
export var Horizontal = {
    args: {
        direction: "horizontal",
    },
    decorators: [
        function (Story) { return (<div style={{ width: "100%", padding: "16px" }}>
        <p>Content above</p>
        <Story />
        <p>Content below</p>
      </div>); },
    ],
};
export var Vertical = {
    args: {
        direction: "vertical",
    },
    decorators: [
        function (Story) { return (<div style={{ display: "flex", alignItems: "center", height: "100px", gap: "16px" }}>
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>); },
    ],
};
export var InFlexContainer = {
    render: function () { return (<div style={{ display: "flex", alignItems: "center", gap: "16px", height: "40px" }}>
      <span>Item 1</span>
      <Line direction="vertical"/>
      <span>Item 2</span>
      <Line direction="vertical"/>
      <span>Item 3</span>
    </div>); },
};
export var BetweenSections = {
    render: function () { return (<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h3>Section 1</h3>
        <p>Some content here</p>
      </div>
      <Line direction="horizontal"/>
      <div>
        <h3>Section 2</h3>
        <p>More content here</p>
      </div>
      <Line direction="horizontal"/>
      <div>
        <h3>Section 3</h3>
        <p>Even more content</p>
      </div>
    </div>); },
};
