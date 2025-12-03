import React, { useState } from "react";
import Tab from "../components/tab";
import TabsContainer from "../components/tabsContainer";
var meta = {
    title: "Components/Tab",
    component: Tab,
    argTypes: {
        label: { control: "text" },
        isSelected: { control: "boolean" },
        decoIcon: { control: "text" },
        actionIcon: { control: "text" },
    },
};
export default meta;
export var Default = {
    args: {
        label: "Tab Label",
        isSelected: false,
        onClickTab: function () { },
    },
};
export var Selected = {
    args: {
        label: "Selected Tab",
        isSelected: true,
        onClickTab: function () { },
    },
};
export var WithDecoIcon = {
    args: {
        label: "With Icon",
        isSelected: false,
        decoIcon: "Home",
        onClickTab: function () { },
    },
};
export var WithActionIcon = {
    args: {
        label: "With Action",
        isSelected: false,
        actionIcon: "X",
        onClickTab: function () { },
    },
};
export var WithBothIcons = {
    args: {
        label: "Full Tab",
        isSelected: true,
        decoIcon: "File",
        actionIcon: "X",
        onClickTab: function () { },
    },
};
var TabGroupWrapper = function () {
    var _a = useState(0), selected = _a[0], setSelected = _a[1];
    var tabs = ["Overview", "Projects", "Tasks", "Settings"];
    return (<TabsContainer>
      {tabs.map(function (tab, index) { return (<Tab key={tab} label={tab} isSelected={selected === index} onClickTab={function () { return setSelected(index); }}/>); })}
    </TabsContainer>);
};
export var TabGroup = {
    render: function () { return <TabGroupWrapper />; },
};
