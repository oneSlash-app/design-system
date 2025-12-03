import React, { useState, useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Popover from "../components/popover";
import Button from "../components/button";
import Menu from "../components/menu";
import MenuItem from "../components/menuItem";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

const PopoverWrapper = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ padding: "100px" }}>
      <div ref={buttonRef} style={{ display: "inline-block" }}>
        <Button
          size="medium"
          type="primary"
          state="enabled"
          label="Open Popover"
          onClickButton={() => setOpen(!open)}
        />
      </div>
      <Popover
        open={open}
        anchorEl={buttonRef.current}
        onClose={() => setOpen(false)}
      >
        <div style={{ padding: "8px" }}>
          <p>Popover content goes here</p>
        </div>
      </Popover>
    </div>
  );
};

export const Default: Story = {
  render: () => <PopoverWrapper />,
};

const PopoverWithMenuWrapper = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ padding: "100px" }}>
      <div ref={buttonRef} style={{ display: "inline-block" }}>
        <Button
          size="medium"
          type="secondary"
          state="enabled"
          label="Actions"
          onClickButton={() => setOpen(!open)}
        />
      </div>
      <Popover
        open={open}
        anchorEl={buttonRef.current}
        onClose={() => setOpen(false)}
      >
        <Menu width={180}>
          <MenuItem label="Edit" iconName="Edit" onClick={() => setOpen(false)} />
          <MenuItem label="Duplicate" iconName="Copy" onClick={() => setOpen(false)} />
          <MenuItem label="Archive" iconName="Archive" onClick={() => setOpen(false)} />
          <MenuItem label="Delete" iconName="Trash2" onClick={() => setOpen(false)} />
        </Menu>
      </Popover>
    </div>
  );
};

export const WithMenu: Story = {
  render: () => <PopoverWithMenuWrapper />,
};
