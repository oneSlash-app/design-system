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
/** Renders an h2; the type style is the same as the default. */
export const Level2: Story = { args: { level: 2 } };
