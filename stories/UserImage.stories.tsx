import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import UserImage from "../components/userImage";

const meta: Meta<typeof UserImage> = {
  title: "Components/UserImage",
  component: UserImage,
  argTypes: {
    userHandle: { control: "text" },
    userImgUrl: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof UserImage>;

export const WithInitial: Story = {
  args: {
    userHandle: "John Doe",
  },
};

export const SingleName: Story = {
  args: {
    userHandle: "Alice",
  },
};

export const WithImage: Story = {
  args: {
    userHandle: "Jane Smith",
    userImgUrl: "https://i.pravatar.cc/150?img=1",
  },
};

export const DifferentUsers: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <UserImage userHandle="Alice Brown" />
      <UserImage userHandle="Bob Smith" />
      <UserImage userHandle="Carol Davis" />
      <UserImage userHandle="David Lee" />
      <UserImage userHandle="Emma Wilson" />
      <UserImage userHandle="Frank Miller" />
    </div>
  ),
};

export const MixedWithImages: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <UserImage userHandle="John Doe" userImgUrl="https://i.pravatar.cc/150?img=1" />
      <UserImage userHandle="Alice Brown" />
      <UserImage userHandle="Jane Smith" userImgUrl="https://i.pravatar.cc/150?img=5" />
      <UserImage userHandle="Bob Wilson" />
      <UserImage userHandle="Carol Davis" userImgUrl="https://i.pravatar.cc/150?img=9" />
    </div>
  ),
};
