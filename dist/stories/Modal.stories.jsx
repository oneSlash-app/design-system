import React, { useState } from "react";
import Modal from "../components/modal";
import Button from "../components/button";
var meta = {
    title: "Components/Modal",
    component: Modal,
    argTypes: {
        title: { control: "text" },
        size: {
            control: "select",
            options: ["small", "medium", "large"],
        },
    },
};
export default meta;
var ModalWrapper = function (args) {
    var _a = useState(false), isOpen = _a[0], setIsOpen = _a[1];
    return (<div>
      <Button size="medium" type="primary" state="enabled" label="Open Modal" onClickButton={function () { return setIsOpen(true); }}/>
      <Modal {...args} isOpen={isOpen} onClose={function () { return setIsOpen(false); }}>
        {args.children}
      </Modal>
    </div>);
};
export var Default = {
    render: function (args) { return <ModalWrapper {...args}/>; },
    args: {
        title: "Modal Title",
        children: "This is the modal content. You can put any content here.",
        size: "medium",
        actions: (<div style={{ display: "flex", gap: "8px" }}>
        <Button size="medium" type="tertiary" state="enabled" label="Cancel"/>
        <Button size="medium" type="primary" state="enabled" label="Confirm"/>
      </div>),
    },
};
export var Large = {
    render: function (args) { return <ModalWrapper {...args}/>; },
    args: {
        title: "Large Modal",
        children: "This is a larger modal for more complex content.",
        size: "large",
    },
};
export var NoTitle = {
    render: function (args) { return <ModalWrapper {...args}/>; },
    args: {
        children: "Modal without a title. Content goes directly here.",
        size: "medium",
    },
};
export var WithActions = {
    render: function (args) { return <ModalWrapper {...args}/>; },
    args: {
        title: "Confirm Action",
        children: "Are you sure you want to proceed with this action?",
        size: "medium",
        actions: (<div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", width: "100%" }}>
        <Button size="medium" type="tertiary" state="enabled" label="Cancel"/>
        <Button size="medium" type="primary" state="enabled" label="Delete"/>
      </div>),
    },
};
var longContent = (<div>
    {Array.from({ length: 30 }, function (_, i) { return (<p key={i}>
        This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>); })}
  </div>);
export var LongContent = {
    render: function (args) { return <ModalWrapper {...args}/>; },
    args: {
        title: "Scrollable Modal",
        children: longContent,
        size: "medium",
    },
};
