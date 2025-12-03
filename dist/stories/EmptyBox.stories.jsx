import EmptyBox from "../components/emptyBox";
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
