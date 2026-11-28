import React, { useEffect, useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Toaster, { toast, dismissToast } from "../components/toaster";
import Button from "../components/button";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toaster",
  component: Toaster,
};

export default meta;
type Story = StoryObj<typeof Toaster>;

// Opens three toasts on first render and closes every toast it opened when the story unmounts
const StackDemo = () => {
  const ids = useRef<string[]>([]);
  const show = (input: Parameters<typeof toast>[0]) => ids.current.push(toast(input));
  useEffect(() => {
    show({ type: "success", message: "Changes saved" });
    show({ type: "info", message: "Sync runs every hour", secondMessage: "The next one starts at 1:00 PM." });
    show({ type: "error", message: "Could not upload photo.jpg" });
    return () => {
      ids.current.forEach(dismissToast);
      ids.current = [];
    };
  }, []);
  return (
    <div>
      <Button size="medium" type="primary" state="enabled" label="Show a toast" onClickButton={() => show("Saved")} />
      <Toaster />
    </div>
  );
};

export const Stack: Story = {
  render: () => <StackDemo />,
};
