import type { Meta, StoryObj } from "@storybook/react";
import Checkbox from "../components/checkBox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    label: "I agree to the privacy policy",
    checked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "This option is disabled",
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled and checked",
    checked: true,
    disabled: true,
  },
};

export const NoLabel: Story = {
  args: {
    checked: false,
    disabled: false,
  },
};
