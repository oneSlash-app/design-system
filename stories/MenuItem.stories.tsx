import type { Meta, StoryObj } from "@storybook/react";
import MenuItem from "../components/menuItem";
import IconButton from "../components/iconButton";

const meta: Meta<typeof MenuItem> = {
  title: "Components/MenuItem",
  component: MenuItem,
  argTypes: {
    label: { control: "text" },
    iconName: { control: "text" },
    isSelected: { control: "boolean" },
    size: {
      control: "select",
      options: ["medium", "large"],
    },
    iconRight: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    label: "Menu Item",
    iconName: "File",
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    label: "Selected Item",
    iconName: "Check",
    isSelected: true,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Expandable Item",
    iconName: "Folder",
    iconRight: "ChevronRight",
    isSelected: false,
  },
};

export const WithTag: Story = {
  args: {
    label: "Notifications",
    iconName: "Bell",
    tag: { label: "5", iconName: "Star" },
    isSelected: false,
  },
};

export const WithTagColor: Story = {
  args: {
    label: "New Feature",
    iconName: "Sparkles",
    tag: { label: "New", color: "success" },
    isSelected: false,
  },
};

export const WithUserImage: Story = {
  args: {
    label: "John Doe",
    userHandle: "johndoe",
    userImgUrl: "",
    isSelected: false,
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large Menu Item",
    iconName: "Settings",
    size: "large",
    isSelected: false,
  },
};

export const WithRightAction: Story = {
  args: {
    label: "Removable Item",
    iconName: "File",
    isSelected: false,
    rightAction: <IconButton iconName="X" size="small" color="tertiary" state="enabled" onClick={() => alert('Remove clicked')} />,
  },
};
