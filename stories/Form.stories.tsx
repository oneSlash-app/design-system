import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Form from "../components/form";
import TextField from "../components/textField";
import Button from "../components/button";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  argTypes: {
    gap: {
      control: "select",
      options: ["small", "medium", "large", "xlarge", "xxlarge", "huge", "giant"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: (args) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
      <Form {...args} aria-label="Sign in" onSubmit={() => alert("Submitted")}>
        <TextField id="form-email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField id="form-password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button size="medium" type="primary" state="enabled" label="Sign in" htmlType="submit" />
      </Form>
    );
  },
};
