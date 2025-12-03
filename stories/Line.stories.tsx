import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Line from "../components/line";

const meta: Meta<typeof Line> = {
  title: "Components/Line",
  component: Line,
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Line>;

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", padding: "16px" }}>
        <p>Content above</p>
        <Story />
        <p>Content below</p>
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
  },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", alignItems: "center", height: "100px", gap: "16px" }}>
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    ),
  ],
};

export const InFlexContainer: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", height: "40px" }}>
      <span>Item 1</span>
      <Line direction="vertical" />
      <span>Item 2</span>
      <Line direction="vertical" />
      <span>Item 3</span>
    </div>
  ),
};

export const BetweenSections: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h3>Section 1</h3>
        <p>Some content here</p>
      </div>
      <Line direction="horizontal" />
      <div>
        <h3>Section 2</h3>
        <p>More content here</p>
      </div>
      <Line direction="horizontal" />
      <div>
        <h3>Section 3</h3>
        <p>Even more content</p>
      </div>
    </div>
  ),
};
