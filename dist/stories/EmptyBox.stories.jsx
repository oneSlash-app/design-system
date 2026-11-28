import React from "react";
import EmptyBox from "../components/emptyBox";
import Button from "../components/button";
var meta = {
    title: "Components/EmptyBox",
    component: EmptyBox,
    argTypes: {
        text: { control: "text" },
        size: {
            control: "select",
            options: ["small", "large"],
        },
    },
};
export default meta;
export var Small = {
    args: {
        text: "No items found",
        size: "small",
    },
};
export var Large = {
    args: {
        text: "No data available. Try adding some items to get started.",
        size: "large",
    },
    decorators: [
        function (Story) { return (<div style={{ height: "300px" }}>
        <Story />
      </div>); },
    ],
};
export var WithAction = {
    args: {
        text: "No projects yet",
        secondText: "Create one to get started.",
        size: "small",
        action: (<Button size="medium" type="primary" state="enabled" label="New project" onClickButton={function () { }}/>),
    },
};
export var CustomIcon = {
    args: {
        text: "No results for this search",
        size: "small",
        icon: "Search",
    },
};
