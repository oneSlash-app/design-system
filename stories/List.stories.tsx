import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import List from "../components/list";

const items = [
  "Short item",
  "A longer item that is long enough to wrap onto a second line in a narrow column, to show the marker staying put.",
  "Last item",
];

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  args: { items },
  argTypes: {
    marker: { control: "select", options: ["none", "dot", "number"] },
    size: { control: "select", options: ["body1", "body2"] },
    tone: { control: "select", options: ["primary", "secondary"] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "280px", padding: "16px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof List>;

export const None: Story = { args: { marker: "none" } };
export const Dot: Story = { args: { marker: "dot" } };
export const Number: Story = { args: { marker: "number" } };
export const SecondaryDot: Story = { args: { marker: "dot", tone: "secondary" } };
