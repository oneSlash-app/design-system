import React, { useState } from "react";
import RadioGroup from "../components/radioGroup";
var meta = {
    title: "Components/RadioGroup",
    component: RadioGroup,
    argTypes: {
        direction: {
            control: "select",
            options: ["horizontal", "vertical"],
        },
    },
};
export default meta;
var RadioGroupWrapper = function (args) {
    var _a = useState(args.selectedValue || "option1"), selected = _a[0], setSelected = _a[1];
    return (<RadioGroup {...args} selectedValue={selected} onChange={setSelected}/>);
};
export var Vertical = {
    render: function (args) { return <RadioGroupWrapper {...args}/>; },
    args: {
        options: [
            { label: "Option 1", value: "option1" },
            { label: "Option 2", value: "option2" },
            { label: "Option 3", value: "option3" },
        ],
        selectedValue: "option1",
        direction: "vertical",
    },
};
export var Horizontal = {
    render: function (args) { return <RadioGroupWrapper {...args}/>; },
    args: {
        options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
        ],
        selectedValue: "medium",
        direction: "horizontal",
    },
};
export var PaymentOptions = {
    render: function (args) { return <RadioGroupWrapper {...args}/>; },
    args: {
        options: [
            { label: "Credit Card", value: "credit" },
            { label: "PayPal", value: "paypal" },
            { label: "Bank Transfer", value: "bank" },
        ],
        selectedValue: "credit",
        direction: "vertical",
    },
};
