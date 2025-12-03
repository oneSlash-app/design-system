import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Select from "../components/select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    multiple: { control: "boolean" },
    width: { control: "text" },
    decoIconName: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const SelectWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  return <Select {...args} value={value} onChange={setValue} />;
};

const MultiSelectWrapper = (args: any) => {
  const [values, setValues] = useState<string[]>(args.value || []);
  return <Select {...args} value={values} onChange={setValues} />;
};

export const Default: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    placeholder: "Select an option",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
    width: 200,
  },
};

export const WithIcons: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    placeholder: "Choose a status",
    options: [
      { value: "active", label: "Active", iconName: "CheckCircle" },
      { value: "pending", label: "Pending", iconName: "Clock" },
      { value: "inactive", label: "Inactive", iconName: "XCircle" },
    ],
    width: 200,
  },
};

export const WithDecoIcon: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    placeholder: "Select category",
    decoIconName: "Folder",
    options: [
      { value: "work", label: "Work" },
      { value: "personal", label: "Personal" },
      { value: "other", label: "Other" },
    ],
    width: 200,
  },
};

export const Disabled: Story = {
  render: (args) => <SelectWrapper {...args} />,
  args: {
    placeholder: "Disabled select",
    disabled: true,
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
    width: 200,
  },
};

export const MultiSelect: Story = {
  render: (args) => <MultiSelectWrapper {...args} />,
  args: {
    placeholder: "Select multiple",
    multiple: true,
    options: [
      { value: "react", label: "React" },
      { value: "vue", label: "Vue" },
      { value: "angular", label: "Angular" },
      { value: "svelte", label: "Svelte" },
    ],
    width: 250,
  },
};
