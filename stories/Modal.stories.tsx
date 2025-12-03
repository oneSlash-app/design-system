import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Modal from "../components/modal";
import Button from "../components/button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    title: { control: "text" },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button
        size="medium"
        type="primary"
        state="enabled"
        label="Open Modal"
        onClickButton={() => setIsOpen(true)}
      />
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children}
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Modal Title",
    children: "This is the modal content. You can put any content here.",
    size: "medium",
    actions: (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button size="medium" type="tertiary" state="enabled" label="Cancel" />
        <Button size="medium" type="primary" state="enabled" label="Confirm" />
      </div>
    ),
  },
};

export const Large: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Large Modal",
    children: "This is a larger modal for more complex content.",
    size: "large",
  },
};

export const NoTitle: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    children: "Modal without a title. Content goes directly here.",
    size: "medium",
  },
};

export const WithActions: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Confirm Action",
    children: "Are you sure you want to proceed with this action?",
    size: "medium",
    actions: (
      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", width: "100%" }}>
        <Button size="medium" type="tertiary" state="enabled" label="Cancel" />
        <Button size="medium" type="primary" state="enabled" label="Delete" />
      </div>
    ),
  },
};

const longContent = (
  <div>
    {Array.from({ length: 30 }, (_, i) => (
      <p key={i}>
        This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    ))}
  </div>
);

export const LongContent: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "Scrollable Modal",
    children: longContent,
    size: "medium",
  },
};
