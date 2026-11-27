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

// `size` is the diameter in pixels; the initial scales with it. `referrerPolicy` reaches the <img>.
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <UserImage userHandle="Alice Brown" size={16} />
      <UserImage userHandle="Alice Brown" />
      <UserImage userHandle="Alice Brown" size={32} />
      <UserImage userHandle="Alice Brown" size={48} />
      <UserImage userHandle="Jane Smith" userImgUrl="https://i.pravatar.cc/150?img=5" size={48} referrerPolicy="no-referrer" />
    </div>
  ),
};
