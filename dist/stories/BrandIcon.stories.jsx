import React from "react";
import BrandIcon from "../components/brandIcon";
import Button from "../components/button";
var meta = {
    title: "Components/BrandIcon",
    component: BrandIcon,
    argTypes: {
        name: { control: "select", options: ["google", "github", "apple"] },
        size: { control: "number" },
        title: { control: "text" },
    },
};
export default meta;
export var Google = { args: { name: "google", size: 24 } };
export var GitHub = { args: { name: "github", size: 24 } };
export var Apple = { args: { name: "apple", size: 24 } };
export var InAButton = {
    render: function () { return (<Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google"/>}/>); },
};
