import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import PageHeader from "../components/pageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "Components/PageHeader",
  component: PageHeader,
  args: {
    eyebrow: "Design Translation · 2011",
    title: "Geocentric Clock",
    lede: "The arm stays still and the numbers come to it.",
  },
  argTypes: {
    level: { control: "select", options: [1, 2, 3] },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {};
/** Level 1 (the default) renders an h1 at the largest title size. */
export const Level1: Story = { args: { level: 1 } };
/** Renders an h2, one type step smaller than level 1. */
export const Level2: Story = { args: { level: 2 } };
/** Renders an h3, two type steps smaller than level 1. */
export const Level3: Story = { args: { level: 3 } };
