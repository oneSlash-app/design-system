import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RadioGroup from "../components/radioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  argTypes: {
    direction: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const RadioGroupWrapper = (args: any) => {
  const [selected, setSelected] = useState(args.selectedValue || "option1");
  return (
    <RadioGroup
      {...args}
      selectedValue={selected}
      onChange={setSelected}
    />
  );
};

export const Vertical: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ],
    selectedValue: "option1",
    direction: "vertical",
  },
};

export const Horizontal: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    options: [
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ],
    selectedValue: "medium",
    direction: "horizontal",
  },
};

export const PaymentOptions: Story = {
  render: (args) => <RadioGroupWrapper {...args} />,
  args: {
    options: [
      { label: "Credit Card", value: "credit" },
      { label: "PayPal", value: "paypal" },
      { label: "Bank Transfer", value: "bank" },
    ],
    selectedValue: "credit",
    direction: "vertical",
  },
};
