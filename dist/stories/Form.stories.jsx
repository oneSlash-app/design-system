import React, { useState } from "react";
import Form from "../components/form";
import TextField from "../components/textField";
import Button from "../components/button";
var meta = {
    title: "Components/Form",
    component: Form,
    argTypes: {
        gap: {
            control: "select",
            options: ["small", "medium", "large", "xlarge", "xxlarge", "huge", "giant"],
        },
    },
};
export default meta;
export var Default = {
    render: function (args) {
        var _a = useState(""), email = _a[0], setEmail = _a[1];
        var _b = useState(""), password = _b[0], setPassword = _b[1];
        return (<Form {...args} aria-label="Sign in" onSubmit={function () { return alert("Submitted"); }}>
        <TextField id="form-email" label="Email" type="email" value={email} onChange={function (e) { return setEmail(e.target.value); }}/>
        <TextField id="form-password" label="Password" type="password" value={password} onChange={function (e) { return setPassword(e.target.value); }}/>
        <Button size="medium" type="primary" state="enabled" label="Sign in" htmlType="submit"/>
      </Form>);
    },
};
