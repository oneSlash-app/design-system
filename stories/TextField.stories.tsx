import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TextField from "../components/textField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    multiline: { control: "boolean" },
    maxRows: { control: "number" },
    size: {
      control: "select",
      options: ["large", "medium", "small"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

const TextFieldWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  return (
    <TextField
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  render: (args) => <TextFieldWrapper {...args} />,
  args: {
    id: "default-textfield",
    label: "Label",
    value: "",
    size: "medium",
  },
};

export const WithValue: Story = {
  render: (args) => <TextFieldWrapper {...args} />,
  args: {
    id: "with-value-textfield",
    label: "Name",
    value: "John Doe",
    size: "medium",
  },
};

export const Disabled: Story = {
  render: (args) => <TextFieldWrapper {...args} />,
  args: {
    id: "disabled-textfield",
    label: "Disabled Field",
    value: "Cannot edit",
    disabled: true,
    size: "medium",
  },
};

export const WithError: Story = {
  render: (args) => <TextFieldWrapper {...args} />,
  args: {
    id: "error-textfield",
    label: "Required Field",
    value: "",
    error: true,
    size: "medium",
  },
};

export const LargeSize: Story = {
  render: (args) => <TextFieldWrapper {...args} />,
  args: {
    id: "large-textfield",
    label: "Large Input",
    value: "",
    size: "large",
  },
};

export const SmallSize: Story = {
  render: (args) => <TextFieldWrapper {...args} />,
  args: {
    id: "small-textfield",
    label: "Small Input",
    value: "",
    size: "small",
  },
};

export const Multiline: Story = {
  render: (args) => <TextFieldWrapper {...args} />,
  args: {
    id: "multiline-textfield",
    label: "Description",
    value: "",
    multiline: true,
    maxRows: 4,
    size: "medium",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "300px" }}>
      <TextFieldWrapper id="size-small" label="Small" size="small" />
      <TextFieldWrapper id="size-medium" label="Medium" size="medium" />
      <TextFieldWrapper id="size-large" label="Large" size="large" />
    </div>
  ),
};
