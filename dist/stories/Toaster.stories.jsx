import React, { useEffect, useRef } from "react";
import Toaster, { toast, dismissToast } from "../components/toaster";
import Button from "../components/button";
var meta = {
    title: "Components/Toaster",
    component: Toaster,
};
export default meta;
// Opens three toasts on first render and closes every toast it opened when the story unmounts
var StackDemo = function () {
    var ids = useRef([]);
    var show = function (input) { return ids.current.push(toast(input)); };
    useEffect(function () {
        show({ type: "success", message: "Changes saved" });
        show({ type: "info", message: "Sync runs every hour", secondMessage: "The next one starts at 1:00 PM." });
        show({ type: "error", message: "Could not upload photo.jpg" });
        return function () {
            ids.current.forEach(dismissToast);
            ids.current = [];
        };
    }, []);
    return (<div>
      <Button size="medium" type="primary" state="enabled" label="Show a toast" onClickButton={function () { return show("Saved"); }}/>
      <Toaster />
    </div>);
};
export var Stack = {
    render: function () { return <StackDemo />; },
};
