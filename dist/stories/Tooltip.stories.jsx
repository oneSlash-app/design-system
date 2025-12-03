import React from "react";
import Tooltip from "../components/tooltip";
import Button from "../components/button";
import IconButton from "../components/iconButton";
var meta = {
    title: "Components/Tooltip",
    component: Tooltip,
    argTypes: {
        title: { control: "text" },
    },
};
export default meta;
export var Default = {
    render: function (args) { return (<div style={{ padding: "50px" }}>
      <Tooltip {...args}>
        <Button size="medium" type="primary" state="enabled" label="Hover me" onClickButton={function () { }}/>
      </Tooltip>
    </div>); },
    args: {
        title: "This is a tooltip",
    },
};
export var OnIconButton = {
    render: function () { return (<div style={{ padding: "50px" }}>
      <Tooltip title="Settings">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Settings"/>
      </Tooltip>
    </div>); },
};
export var LongText = {
    render: function () { return (<div style={{ padding: "50px" }}>
      <Tooltip title="This is a longer tooltip message that provides more context">
        <Button size="medium" type="secondary" state="enabled" label="Hover for details" onClickButton={function () { }}/>
      </Tooltip>
    </div>); },
};
export var MultipleTooltips = {
    render: function () { return (<div style={{ display: "flex", gap: "16px", padding: "50px" }}>
      <Tooltip title="Edit">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Edit"/>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Trash2"/>
      </Tooltip>
      <Tooltip title="Share">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Share"/>
      </Tooltip>
      <Tooltip title="Download">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Download"/>
      </Tooltip>
    </div>); },
};
