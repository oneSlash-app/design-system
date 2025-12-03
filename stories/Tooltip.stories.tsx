import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "../components/tooltip";
import Button from "../components/button";
import IconButton from "../components/iconButton";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: "50px" }}>
      <Tooltip {...args}>
        <Button
          size="medium"
          type="primary"
          state="enabled"
          label="Hover me"
          onClickButton={() => {}}
        />
      </Tooltip>
    </div>
  ),
  args: {
    title: "This is a tooltip",
  },
};

export const OnIconButton: Story = {
  render: () => (
    <div style={{ padding: "50px" }}>
      <Tooltip title="Settings">
        <IconButton
          color="tertiary"
          state="enabled"
          size="medium"
          iconName="Settings"
        />
      </Tooltip>
    </div>
  ),
};

export const LongText: Story = {
  render: () => (
    <div style={{ padding: "50px" }}>
      <Tooltip title="This is a longer tooltip message that provides more context">
        <Button
          size="medium"
          type="secondary"
          state="enabled"
          label="Hover for details"
          onClickButton={() => {}}
        />
      </Tooltip>
    </div>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", padding: "50px" }}>
      <Tooltip title="Edit">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Edit" />
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Trash2" />
      </Tooltip>
      <Tooltip title="Share">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Share" />
      </Tooltip>
      <Tooltip title="Download">
        <IconButton color="tertiary" state="enabled" size="medium" iconName="Download" />
      </Tooltip>
    </div>
  ),
};
