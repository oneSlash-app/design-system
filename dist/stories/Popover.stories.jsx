import React, { useState, useRef } from "react";
import Popover from "../components/popover";
import Button from "../components/button";
import Menu from "../components/menu";
import MenuItem from "../components/menuItem";
var meta = {
    title: "Components/Popover",
    component: Popover,
};
export default meta;
var PopoverWrapper = function () {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var buttonRef = useRef(null);
    return (<div style={{ padding: "100px" }}>
      <div ref={buttonRef} style={{ display: "inline-block" }}>
        <Button size="medium" type="primary" state="enabled" label="Open Popover" onClickButton={function () { return setOpen(!open); }}/>
      </div>
      <Popover open={open} anchorEl={buttonRef.current} onClose={function () { return setOpen(false); }}>
        <div style={{ padding: "8px" }}>
          <p>Popover content goes here</p>
        </div>
      </Popover>
    </div>);
};
export var Default = {
    render: function () { return <PopoverWrapper />; },
};
var PopoverWithMenuWrapper = function () {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var buttonRef = useRef(null);
    return (<div style={{ padding: "100px" }}>
      <div ref={buttonRef} style={{ display: "inline-block" }}>
        <Button size="medium" type="secondary" state="enabled" label="Actions" onClickButton={function () { return setOpen(!open); }}/>
      </div>
      <Popover open={open} anchorEl={buttonRef.current} onClose={function () { return setOpen(false); }}>
        <Menu width={180}>
          <MenuItem label="Edit" iconName="Edit" onClick={function () { return setOpen(false); }}/>
          <MenuItem label="Duplicate" iconName="Copy" onClick={function () { return setOpen(false); }}/>
          <MenuItem label="Archive" iconName="Archive" onClick={function () { return setOpen(false); }}/>
          <MenuItem label="Delete" iconName="Trash2" onClick={function () { return setOpen(false); }}/>
        </Menu>
      </Popover>
    </div>);
};
export var WithMenu = {
    render: function () { return <PopoverWithMenuWrapper />; },
};
