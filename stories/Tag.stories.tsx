import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tag from "../components/tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  decorators: [
    (Story) => (
      <div style={{ display: "flex" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["contained", "textOnly", "dot"],
    },
    size: {
      control: "select",
      options: ["medium", "small"],
    },
    state: {
      control: "select",
      options: ["enabled", "selected"],
    },
    color: {
      control: "select",
      options: [undefined, "default", "success", "warning", "error", "info"],
    },
    label: { control: "text" },
    iconName: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Contained: Story = {
  args: {
    variant: "contained",
    size: "medium",
    state: "enabled",
    label: "Tag Label",
  },
};

export const TextOnly: Story = {
  args: {
    variant: "textOnly",
    size: "medium",
    state: "enabled",
    label: "Text Tag",
  },
};

export const Selected: Story = {
  args: {
    variant: "contained",
    size: "medium",
    state: "selected",
    label: "Selected",
  },
};

export const WithIcon: Story = {
  args: {
    variant: "contained",
    size: "medium",
    state: "enabled",
    label: "With Icon",
    iconName: "Star",
  },
};

export const Small: Story = {
  args: {
    variant: "contained",
    size: "small",
    state: "enabled",
    label: "Small Tag",
  },
};

export const Clickable: Story = {
  args: {
    variant: "contained",
    size: "medium",
    state: "enabled",
    label: "Click me",
    onClick: () => alert("Tag clicked!"),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
      <Tag variant="contained" size="medium" label="Contained" />
      <Tag variant="textOnly" size="medium" label="Text Only" />
      <Tag variant="contained" size="medium" state="selected" label="Selected" />
      <Tag variant="contained" size="small" label="Small" />
      <Tag variant="contained" size="medium" label="With Icon" iconName="Check" />
    </div>
  ),
};

export const Success: Story = {
  args: {
    variant: "contained",
    size: "medium",
    color: "success",
    label: "Success",
  },
};

export const Warning: Story = {
  args: {
    variant: "contained",
    size: "medium",
    color: "warning",
    label: "Warning",
  },
};

export const Error: Story = {
  args: {
    variant: "contained",
    size: "medium",
    color: "error",
    label: "Error",
  },
};

export const Info: Story = {
  args: {
    variant: "contained",
    size: "medium",
    color: "info",
    label: "Info",
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ width: "80px" }}>Contained:</span>
        <Tag variant="contained" size="medium" color="default" label="Default" />
        <Tag variant="contained" size="medium" color="success" label="Success" />
        <Tag variant="contained" size="medium" color="warning" label="Warning" />
        <Tag variant="contained" size="medium" color="error" label="Error" />
        <Tag variant="contained" size="medium" color="info" label="Info" />
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ width: "80px" }}>Text Only:</span>
        <Tag variant="textOnly" size="medium" color="default" label="Default" />
        <Tag variant="textOnly" size="medium" color="success" label="Success" />
        <Tag variant="textOnly" size="medium" color="warning" label="Warning" />
        <Tag variant="textOnly" size="medium" color="error" label="Error" />
        <Tag variant="textOnly" size="medium" color="info" label="Info" />
      </div>
      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <span style={{ width: "80px" }}>Dot:</span>
        <Tag variant="dot" size="medium" color="default" label="Default" />
        <Tag variant="dot" size="medium" color="success" label="Success" />
        <Tag variant="dot" size="medium" color="warning" label="Warning" />
        <Tag variant="dot" size="medium" color="error" label="Error" />
        <Tag variant="dot" size="medium" color="info" label="Info" />
      </div>
    </div>
  ),
};

export const Dot: Story = {
  args: {
    variant: "dot",
    size: "medium",
    color: "success",
    label: "Active",
  },
};

export const DotColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Tag variant="dot" size="medium" color="default" label="Default" />
      <Tag variant="dot" size="medium" color="success" label="Online" />
      <Tag variant="dot" size="medium" color="warning" label="Away" />
      <Tag variant="dot" size="medium" color="error" label="Offline" />
      <Tag variant="dot" size="medium" color="info" label="Busy" />
    </div>
  ),
};
