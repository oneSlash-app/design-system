import Image from "../components/image";
var meta = {
    title: "Components/Image",
    component: Image,
    argTypes: {
        fit: { control: "select", options: [undefined, "cover", "contain"] },
        loading: { control: "select", options: [undefined, "lazy", "eager"] },
    },
};
export default meta;
var src = "data:image/svg+xml;utf8," +
    encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="#888"/></svg>');
export var Default = {
    args: { src: src, alt: "A grey rectangle", width: 320, height: 180 },
};
export var Decoration = {
    args: { src: src, alt: "", width: 160, height: 90, fit: "cover" },
};
