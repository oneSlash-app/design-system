import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    type: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "textOnly"],
    },
    state: {
      control: "select",
      options: ["enabled", "hovered", "focused", "disabled"],
    },
    label: { control: "text" },
    decoIcon: { control: "text" },
    actionIcon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    size: "medium",
    type: "primary",
    state: "enabled",
    label: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    size: "medium",
    type: "secondary",
    state: "enabled",
    label: "Secondary Button",
  },
};

export const Tertiary: Story = {
  args: {
    size: "medium",
    type: "tertiary",
    state: "enabled",
    label: "Tertiary Button",
  },
};

export const WithIcons: Story = {
  args: {
    size: "medium",
    type: "primary",
    state: "enabled",
    label: "With Icons",
    decoIcon: "Star",
    actionIcon: "ChevronRight",
  },
};

export const Disabled: Story = {
  args: {
    size: "medium",
    type: "primary",
    state: "disabled",
    label: "Disabled Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    type: "primary",
    state: "enabled",
    label: "Small Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    type: "primary",
    state: "enabled",
    label: "Large Button",
  },
};
