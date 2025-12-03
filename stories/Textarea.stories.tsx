import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "../components/textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    maxRows: { control: "number" },
    size: {
      control: "select",
      options: ["medium", "small"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

const TextareaWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  render: (args) => <TextareaWrapper {...args} />,
  args: {
    id: "default-textarea",
    label: "Description",
    value: "",
    size: "medium",
  },
};

export const WithValue: Story = {
  render: (args) => <TextareaWrapper {...args} />,
  args: {
    id: "with-value-textarea",
    label: "Notes",
    value: "This is some sample text that demonstrates the textarea component.",
    size: "medium",
  },
};

export const Disabled: Story = {
  render: (args) => <TextareaWrapper {...args} />,
  args: {
    id: "disabled-textarea",
    label: "Disabled",
    value: "This textarea is disabled",
    disabled: true,
    size: "medium",
  },
};

export const WithError: Story = {
  render: (args) => <TextareaWrapper {...args} />,
  args: {
    id: "error-textarea",
    label: "Required Field",
    value: "",
    error: true,
    size: "medium",
  },
};

export const SmallSize: Story = {
  render: (args) => <TextareaWrapper {...args} />,
  args: {
    id: "small-textarea",
    label: "Small Textarea",
    value: "",
    size: "small",
  },
};

export const AutoExpanding: Story = {
  render: (args) => <TextareaWrapper {...args} />,
  args: {
    id: "auto-expand-textarea",
    label: "Type to see auto-expansion (max 6 rows)",
    value: "",
    maxRows: 6,
    size: "medium",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
      <TextareaWrapper id="size-small" label="Small" size="small" />
      <TextareaWrapper id="size-medium" label="Medium" size="medium" />
    </div>
  ),
};
