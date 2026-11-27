import React from "react";
import UserImage from "../components/userImage";
var meta = {
    title: "Components/UserImage",
    component: UserImage,
    argTypes: {
        userHandle: { control: "text" },
        userImgUrl: { control: "text" },
    },
};
export default meta;
export var WithInitial = {
    args: {
        userHandle: "John Doe",
    },
};
export var SingleName = {
    args: {
        userHandle: "Alice",
    },
};
export var WithImage = {
    args: {
        userHandle: "Jane Smith",
        userImgUrl: "https://i.pravatar.cc/150?img=1",
    },
};
export var DifferentUsers = {
    render: function () { return (<div style={{ display: "flex", gap: "8px" }}>
      <UserImage userHandle="Alice Brown"/>
      <UserImage userHandle="Bob Smith"/>
      <UserImage userHandle="Carol Davis"/>
      <UserImage userHandle="David Lee"/>
      <UserImage userHandle="Emma Wilson"/>
      <UserImage userHandle="Frank Miller"/>
    </div>); },
};
export var MixedWithImages = {
    render: function () { return (<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <UserImage userHandle="John Doe" userImgUrl="https://i.pravatar.cc/150?img=1"/>
      <UserImage userHandle="Alice Brown"/>
      <UserImage userHandle="Jane Smith" userImgUrl="https://i.pravatar.cc/150?img=5"/>
      <UserImage userHandle="Bob Wilson"/>
      <UserImage userHandle="Carol Davis" userImgUrl="https://i.pravatar.cc/150?img=9"/>
    </div>); },
};
// `size` is the diameter in pixels; the initial scales with it. `referrerPolicy` reaches the <img>.
export var Sizes = {
    render: function () { return (<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <UserImage userHandle="Alice Brown" size={16}/>
      <UserImage userHandle="Alice Brown"/>
      <UserImage userHandle="Alice Brown" size={32}/>
      <UserImage userHandle="Alice Brown" size={48}/>
      <UserImage userHandle="Jane Smith" userImgUrl="https://i.pravatar.cc/150?img=5" size={48} referrerPolicy="no-referrer"/>
    </div>); },
};
