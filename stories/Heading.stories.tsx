import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Heading from "../components/heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
};

export default meta;
type Story = StoryObj<typeof Heading>;

// `level` is the element in the page's outline; `size` is how large it looks
export const Level1: Story = {
  args: { level: 1, size: "h4", children: "Account settings" },
};
