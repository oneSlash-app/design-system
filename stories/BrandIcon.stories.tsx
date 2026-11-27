import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import BrandIcon from "../components/brandIcon";
import Button from "../components/button";

const meta: Meta<typeof BrandIcon> = {
  title: "Components/BrandIcon",
  component: BrandIcon,
  argTypes: {
    name: { control: "select", options: ["google", "github", "apple"] },
    size: { control: "number" },
    title: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof BrandIcon>;

export const Google: Story = { args: { name: "google", size: 24 } };
export const GitHub: Story = { args: { name: "github", size: 24 } };
export const Apple: Story = { args: { name: "apple", size: 24 } };

export const InAButton: Story = {
  render: () => (
    <Button size="medium" type="secondary" state="enabled" label="Continue with Google" decoIcon={<BrandIcon name="google" />} />
  ),
};
