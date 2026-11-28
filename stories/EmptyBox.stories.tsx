import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import EmptyBox from "../components/emptyBox";
import Button from "../components/button";

const meta: Meta<typeof EmptyBox> = {
  title: "Components/EmptyBox",
  component: EmptyBox,
  argTypes: {
    text: { control: "text" },
    size: {
      control: "select",
      options: ["small", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof EmptyBox>;

export const Small: Story = {
  args: {
    text: "No items found",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    text: "No data available. Try adding some items to get started.",
    size: "large",
  },
  decorators: [
    (Story) => (
      <div style={{ height: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithAction: Story = {
  args: {
    text: "No projects yet",
    secondText: "Create one to get started.",
    size: "small",
    action: (
      <Button size="medium" type="primary" state="enabled" label="New project" onClickButton={() => {}} />
    ),
  },
};

export const CustomIcon: Story = {
  args: {
    text: "No results for this search",
    size: "small",
    icon: "Search",
  },
};
