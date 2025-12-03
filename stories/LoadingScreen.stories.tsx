import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LoadingScreen, { LoadingSmall } from "../components/loadingScreen";

const meta: Meta<typeof LoadingScreen> = {
  title: "Components/LoadingScreen",
  component: LoadingScreen,
};

export default meta;
type Story = StoryObj<typeof LoadingScreen>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Small: StoryObj<typeof LoadingSmall> = {
  render: () => <LoadingSmall size="small" />,
};

export const Medium: StoryObj<typeof LoadingSmall> = {
  render: () => <LoadingSmall size="medium" />,
};

export const Large: StoryObj<typeof LoadingSmall> = {
  render: () => <LoadingSmall size="large" />,
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div>
        <p style={{ marginBottom: "8px" }}>Small</p>
        <LoadingSmall size="small" />
      </div>
      <div>
        <p style={{ marginBottom: "8px" }}>Medium</p>
        <LoadingSmall size="medium" />
      </div>
      <div>
        <p style={{ marginBottom: "8px" }}>Large</p>
        <LoadingSmall size="large" />
      </div>
    </div>
  ),
};
