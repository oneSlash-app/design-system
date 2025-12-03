import Checkbox from "../components/checkBox";
var meta = {
    title: "Components/Checkbox",
    component: Checkbox,
    argTypes: {
        label: { control: "text" },
        checked: { control: "boolean" },
        disabled: { control: "boolean" },
    },
};
export default meta;
export var Default = {
    args: {
        label: "Accept terms and conditions",
        checked: false,
        disabled: false,
    },
};
export var Checked = {
    args: {
        label: "I agree to the privacy policy",
        checked: true,
        disabled: false,
    },
};
export var Disabled = {
    args: {
        label: "This option is disabled",
        checked: false,
        disabled: true,
    },
};
export var DisabledChecked = {
    args: {
        label: "Disabled and checked",
        checked: true,
        disabled: true,
    },
};
export var NoLabel = {
    args: {
        checked: false,
        disabled: false,
    },
};
