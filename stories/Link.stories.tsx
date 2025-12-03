import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Link from "../components/link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  argTypes: {
    href: { control: "text" },
    color: {
      control: "select",
      options: ["info", "error", "warning", "success"],
    },
    size: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "caption"],
    },
    openInNewTab: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Info: Story = {
  args: {
    href: "https://example.com",
    children: "Info Link",
    color: "info",
    size: "body1",
  },
};

export const Error: Story = {
  args: {
    href: "https://example.com",
    children: "Error Link",
    color: "error",
    size: "body1",
  },
};

export const Warning: Story = {
  args: {
    href: "https://example.com",
    children: "Warning Link",
    color: "warning",
    size: "body1",
  },
};

export const Success: Story = {
  args: {
    href: "https://example.com",
    children: "Success Link",
    color: "success",
    size: "body1",
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      <Link href="https://example.com" color="info">Info</Link>
      <Link href="https://example.com" color="error">Error</Link>
      <Link href="https://example.com" color="warning">Warning</Link>
      <Link href="https://example.com" color="success">Success</Link>
    </div>
  ),
};
