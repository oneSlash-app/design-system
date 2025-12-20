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
    color: {
      control: "select",
      options: ["default", "danger"],
    },
    state: {
      control: "select",
      options: ["enabled", "hovered", "focused", "disabled", "selected"],
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

export const Selected: Story = {
  args: {
    size: "medium",
    type: "primary",
    state: "selected",
    label: "Selected Button",
  },
};

export const DangerPrimary: Story = {
  args: {
    size: "medium",
    type: "primary",
    color: "danger",
    state: "enabled",
    label: "Delete Account",
    decoIcon: "Trash2",
  },
};

export const DangerSecondary: Story = {
  args: {
    size: "medium",
    type: "secondary",
    color: "danger",
    state: "enabled",
    label: "Remove Item",
  },
};

export const DangerTertiary: Story = {
  args: {
    size: "medium",
    type: "tertiary",
    color: "danger",
    state: "enabled",
    label: "Cancel",
  },
};

export const DangerTextOnly: Story = {
  args: {
    size: "medium",
    type: "textOnly",
    color: "danger",
    state: "enabled",
    label: "Delete",
  },
};

export const DangerVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button size="medium" type="primary" color="danger" state="enabled" label="Primary" />
      <Button size="medium" type="secondary" color="danger" state="enabled" label="Secondary" />
      <Button size="medium" type="tertiary" color="danger" state="enabled" label="Tertiary" />
      <Button size="medium" type="textOnly" color="danger" state="enabled" label="Text Only" />
    </div>
  ),
};
