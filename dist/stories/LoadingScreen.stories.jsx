import React from "react";
import LoadingScreen, { LoadingSmall } from "../components/loadingScreen";
var meta = {
    title: "Components/LoadingScreen",
    component: LoadingScreen,
};
export default meta;
export var Default = {
    decorators: [
        function (Story) { return (<div style={{ height: "300px" }}>
        <Story />
      </div>); },
    ],
};
export var Small = {
    render: function () { return <LoadingSmall size="small"/>; },
};
export var Medium = {
    render: function () { return <LoadingSmall size="medium"/>; },
};
export var Large = {
    render: function () { return <LoadingSmall size="large"/>; },
};
export var AllSizes = {
    render: function () { return (<div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div>
        <p style={{ marginBottom: "8px" }}>Small</p>
        <LoadingSmall size="small"/>
      </div>
      <div>
        <p style={{ marginBottom: "8px" }}>Medium</p>
        <LoadingSmall size="medium"/>
      </div>
      <div>
        <p style={{ marginBottom: "8px" }}>Large</p>
        <LoadingSmall size="large"/>
      </div>
    </div>); },
};
