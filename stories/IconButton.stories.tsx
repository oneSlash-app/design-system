import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import IconButton from "../components/iconButton";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "iconOnly"],
    },
    state: {
      control: "select",
      options: ["enabled", "selected", "disabled"],
    },
    size: {
      control: "select",
      options: ["large", "medium", "small"],
    },
    iconName: { control: "text" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    color: "primary",
    state: "enabled",
    size: "medium",
    iconName: "Plus",
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
    state: "enabled",
    size: "medium",
    iconName: "Settings",
  },
};

export const Tertiary: Story = {
  args: {
    color: "tertiary",
    state: "enabled",
    size: "medium",
    iconName: "Search",
  },
};

export const IconOnly: Story = {
  args: {
    color: "iconOnly",
    state: "enabled",
    size: "medium",
    iconName: "X",
  },
};

export const Selected: Story = {
  args: {
    color: "primary",
    state: "selected",
    size: "medium",
    iconName: "Check",
  },
};

export const Disabled: Story = {
  args: {
    color: "primary",
    state: "disabled",
    size: "medium",
    iconName: "Plus",
  },
};

export const Loading: Story = {
  args: {
    color: "primary",
    state: "enabled",
    size: "medium",
    iconName: "RefreshCw",
    loading: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <IconButton color="primary" state="enabled" size="small" iconName="Star" />
      <IconButton color="primary" state="enabled" size="medium" iconName="Star" />
      <IconButton color="primary" state="enabled" size="large" iconName="Star" />
    </div>
  ),
};
