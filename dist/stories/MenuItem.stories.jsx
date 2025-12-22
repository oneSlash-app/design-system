import MenuItem from "../components/menuItem";
import IconButton from "../components/iconButton";
var meta = {
    title: "Components/MenuItem",
    component: MenuItem,
    argTypes: {
        label: { control: "text" },
        iconName: { control: "text" },
        isSelected: { control: "boolean" },
        size: {
            control: "select",
            options: ["medium", "large"],
        },
        iconRight: { control: "text" },
    },
};
export default meta;
export var Default = {
    args: {
        label: "Menu Item",
        iconName: "File",
        isSelected: false,
    },
};
export var Selected = {
    args: {
        label: "Selected Item",
        iconName: "Check",
        isSelected: true,
    },
};
export var WithRightIcon = {
    args: {
        label: "Expandable Item",
        iconName: "Folder",
        iconRight: "ChevronRight",
        isSelected: false,
    },
};
export var WithTag = {
    args: {
        label: "Notifications",
        iconName: "Bell",
        tag: { label: "5", iconName: "Star" },
        isSelected: false,
    },
};
export var WithTagColor = {
    args: {
        label: "New Feature",
        iconName: "Sparkles",
        tag: { label: "New", color: "success" },
        isSelected: false,
    },
};
export var WithUserImage = {
    args: {
        label: "John Doe",
        userHandle: "johndoe",
        userImgUrl: "",
        isSelected: false,
    },
};
export var LargeSize = {
    args: {
        label: "Large Menu Item",
        iconName: "Settings",
        size: "large",
        isSelected: false,
    },
};
export var WithRightAction = {
    args: {
        label: "Removable Item",
        iconName: "File",
        isSelected: false,
        rightAction: <IconButton iconName="X" size="small" color="tertiary" state="enabled" onClick={function () { return alert('Remove clicked'); }}/>,
    },
};
