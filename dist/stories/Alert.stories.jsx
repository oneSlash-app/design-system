import React, { useState } from "react";
import Alert from "../components/alert";
import Button from "../components/button";
var meta = {
    title: "Components/Alert",
    component: Alert,
    argTypes: {
        type: {
            control: "select",
            options: ["success", "warning", "error", "info", "default"],
        },
        variant: {
            control: "select",
            options: ["toast", "inline"],
        },
        message: { control: "text" },
        showCloseButton: { control: "boolean" },
    },
};
export default meta;
// Wrapper component to handle state
var AlertWrapper = function (args) {
    var _a = useState(true), open = _a[0], setOpen = _a[1];
    return (<div>
      <Button size="medium" type="primary" state="enabled" label="Show Alert" onClickButton={function () { return setOpen(true); }}/>
      <Alert {...args} open={open} onClose={function () { return setOpen(false); }}/>
    </div>);
};
export var Success = {
    render: function (args) { return <AlertWrapper {...args}/>; },
    args: {
        type: "success",
        message: "Operation completed successfully!",
        showCloseButton: true,
    },
};
export var Warning = {
    render: function (args) { return <AlertWrapper {...args}/>; },
    args: {
        type: "warning",
        message: "Please review your changes before proceeding.",
        showCloseButton: true,
    },
};
export var Error = {
    render: function (args) { return <AlertWrapper {...args}/>; },
    args: {
        type: "error",
        message: "An error occurred. Please try again.",
        showCloseButton: true,
    },
};
export var Info = {
    render: function (args) { return <AlertWrapper {...args}/>; },
    args: {
        type: "info",
        message: "This is an informational message.",
        showCloseButton: true,
    },
};
export var AutoDismiss = {
    render: function (args) { return <AlertWrapper {...args}/>; },
    args: {
        type: "info",
        message: "This alert will auto-dismiss in 5 seconds.",
        showCloseButton: false,
    },
};
// Inline variant stories
var InlineAlertWrapper = function (args) {
    var _a = useState(true), open = _a[0], setOpen = _a[1];
    return (<div style={{ maxWidth: "500px" }}>
      {!open && (<Button size="medium" type="primary" state="enabled" label="Show Alert" onClickButton={function () { return setOpen(true); }}/>)}
      <Alert {...args} open={open} onClose={function () { return setOpen(false); }}/>
    </div>);
};
export var InlineSuccess = {
    render: function (args) { return <InlineAlertWrapper {...args}/>; },
    args: {
        type: "success",
        message: "Your changes have been saved.",
        variant: "inline",
        showCloseButton: true,
    },
};
export var InlineWarning = {
    render: function (args) { return <InlineAlertWrapper {...args}/>; },
    args: {
        type: "warning",
        message: "Your session will expire in 5 minutes.",
        variant: "inline",
        showCloseButton: true,
    },
};
export var InlineError = {
    render: function (args) { return <InlineAlertWrapper {...args}/>; },
    args: {
        type: "error",
        message: "Failed to save changes. Please try again.",
        variant: "inline",
        showCloseButton: true,
    },
};
export var InlineInfo = {
    render: function (args) { return <InlineAlertWrapper {...args}/>; },
    args: {
        type: "info",
        message: "New features are available. Check them out!",
        variant: "inline",
        showCloseButton: true,
    },
};
export var InlineAllTypes = {
    render: function () { return (<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px" }}>
      <Alert type="success" message="Success alert message" variant="inline" showCloseButton/>
      <Alert type="warning" message="Warning alert message" variant="inline" showCloseButton/>
      <Alert type="error" message="Error alert message" variant="inline" showCloseButton/>
      <Alert type="info" message="Info alert message" variant="inline" showCloseButton/>
      <Alert type="default" message="Default alert message" variant="inline" showCloseButton/>
    </div>); },
};
