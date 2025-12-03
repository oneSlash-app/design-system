import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Alert from "../components/alert";
import Button from "../components/button";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    type: {
      control: "select",
      options: ["success", "warning", "error", "info", "default"],
    },
    variant: {
      control: "select",
      options: ["toast", "inline"],
    },
    message: { control: "text" },
    showCloseButton: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// Wrapper component to handle state
const AlertWrapper = (args: any) => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Button
        size="medium"
        type="primary"
        state="enabled"
        label="Show Alert"
        onClickButton={() => setOpen(true)}
      />
      <Alert {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export const Success: Story = {
  render: (args) => <AlertWrapper {...args} />,
  args: {
    type: "success",
    message: "Operation completed successfully!",
    showCloseButton: true,
  },
};

export const Warning: Story = {
  render: (args) => <AlertWrapper {...args} />,
  args: {
    type: "warning",
    message: "Please review your changes before proceeding.",
    showCloseButton: true,
  },
};

export const Error: Story = {
  render: (args) => <AlertWrapper {...args} />,
  args: {
    type: "error",
    message: "An error occurred. Please try again.",
    showCloseButton: true,
  },
};

export const Info: Story = {
  render: (args) => <AlertWrapper {...args} />,
  args: {
    type: "info",
    message: "This is an informational message.",
    showCloseButton: true,
  },
};

export const AutoDismiss: Story = {
  render: (args) => <AlertWrapper {...args} />,
  args: {
    type: "info",
    message: "This alert will auto-dismiss in 5 seconds.",
    showCloseButton: false,
  },
};

// Inline variant stories
const InlineAlertWrapper = (args: any) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ maxWidth: "500px" }}>
      {!open && (
        <Button
          size="medium"
          type="primary"
          state="enabled"
          label="Show Alert"
          onClickButton={() => setOpen(true)}
        />
      )}
      <Alert {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export const InlineSuccess: Story = {
  render: (args) => <InlineAlertWrapper {...args} />,
  args: {
    type: "success",
    message: "Your changes have been saved.",
    variant: "inline",
    showCloseButton: true,
  },
};

export const InlineWarning: Story = {
  render: (args) => <InlineAlertWrapper {...args} />,
  args: {
    type: "warning",
    message: "Your session will expire in 5 minutes.",
    variant: "inline",
    showCloseButton: true,
  },
};

export const InlineError: Story = {
  render: (args) => <InlineAlertWrapper {...args} />,
  args: {
    type: "error",
    message: "Failed to save changes. Please try again.",
    variant: "inline",
    showCloseButton: true,
  },
};

export const InlineInfo: Story = {
  render: (args) => <InlineAlertWrapper {...args} />,
  args: {
    type: "info",
    message: "New features are available. Check them out!",
    variant: "inline",
    showCloseButton: true,
  },
};

export const InlineAllTypes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "500px" }}>
      <Alert type="success" message="Success alert message" variant="inline" showCloseButton />
      <Alert type="warning" message="Warning alert message" variant="inline" showCloseButton />
      <Alert type="error" message="Error alert message" variant="inline" showCloseButton />
      <Alert type="info" message="Info alert message" variant="inline" showCloseButton />
      <Alert type="default" message="Default alert message" variant="inline" showCloseButton />
    </div>
  ),
};
