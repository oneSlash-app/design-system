import React, { useState } from "react";
import TabsContainer from "../components/tabsContainer";
import Tab from "../components/tab";
var meta = {
    title: "Components/TabsContainer",
    component: TabsContainer,
};
export default meta;
var TabsWrapper = function (_a) {
    var tabs = _a.tabs;
    var _b = useState(0), selected = _b[0], setSelected = _b[1];
    return (<TabsContainer>
      {tabs.map(function (tab, index) { return (<Tab key={tab} label={tab} isSelected={selected === index} onClickTab={function () { return setSelected(index); }}/>); })}
    </TabsContainer>);
};
export var Default = {
    render: function () { return <TabsWrapper tabs={["Tab 1", "Tab 2", "Tab 3"]}/>; },
};
export var TwoTabs = {
    render: function () { return <TabsWrapper tabs={["Active", "Archived"]}/>; },
};
export var ManyTabs = {
    render: function () { return (<TabsWrapper tabs={["Overview", "Analytics", "Reports", "Settings", "Users", "Billing"]}/>); },
};
var TabsWithIconsWrapper = function () {
    var _a = useState(0), selected = _a[0], setSelected = _a[1];
    var tabs = [
        { label: "Home", icon: "Home" },
        { label: "Files", icon: "Folder" },
        { label: "Settings", icon: "Settings" },
    ];
    return (<TabsContainer>
      {tabs.map(function (tab, index) { return (<Tab key={tab.label} label={tab.label} decoIcon={tab.icon} isSelected={selected === index} onClickTab={function () { return setSelected(index); }}/>); })}
    </TabsContainer>);
};
export var WithIcons = {
    render: function () { return <TabsWithIconsWrapper />; },
};
var TabsWithSecondLabelWrapper = function () {
    var _a = useState(0), selected = _a[0], setSelected = _a[1];
    var tabs = [
        { label: "Dashboard", secondLabel: "Overview" },
        { label: "Analytics", secondLabel: "Last 7 days" },
        { label: "Reports", secondLabel: "12 new" },
    ];
    return (<TabsContainer>
      {tabs.map(function (tab, index) { return (<Tab key={tab.label} label={tab.label} secondLabel={tab.secondLabel} isSelected={selected === index} onClickTab={function () { return setSelected(index); }}/>); })}
    </TabsContainer>);
};
export var WithSecondLabel = {
    render: function () { return <TabsWithSecondLabelWrapper />; },
};
