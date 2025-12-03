import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Menu from "../components/menu";
import MenuItem from "../components/menuItem";

const meta: Meta<typeof Menu> = {
  title: "Components/Menu",
  component: Menu,
  argTypes: {
    width: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem label="Profile" iconName="User" />
      <MenuItem label="Settings" iconName="Settings" />
      <MenuItem label="Logout" iconName="LogOut" />
    </Menu>
  ),
  args: {
    width: 200,
  },
};

export const WithSelectedItem: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem label="Dashboard" iconName="Home" />
      <MenuItem label="Projects" iconName="Folder" isSelected />
      <MenuItem label="Team" iconName="Users" />
      <MenuItem label="Settings" iconName="Settings" />
    </Menu>
  ),
  args: {
    width: 200,
  },
};

export const WithTags: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem label="Inbox" iconName="Mail" tag={{ label: "12" }} />
      <MenuItem label="Notifications" iconName="Bell" tag={{ label: "New" }} />
      <MenuItem label="Messages" iconName="MessageSquare" />
    </Menu>
  ),
  args: {
    width: 220,
  },
};
