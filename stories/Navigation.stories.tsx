import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Navigation from "../components/navigation";
import MenuItem from "../components/menuItem";

const meta: Meta<typeof Navigation> = {
  title: "Components/Navigation",
  component: Navigation,
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <Navigation>
        <MenuItem label="Home" iconName="Home" isSelected />
        <MenuItem label="Projects" iconName="Folder" />
        <MenuItem label="Team" iconName="Users" />
        <MenuItem label="Calendar" iconName="Calendar" />
        <MenuItem label="Settings" iconName="Settings" />
      </Navigation>
    </div>
  ),
};

export const WithNestedItems: Story = {
  render: () => (
    <div style={{ height: "500px" }}>
      <Navigation>
        <MenuItem label="Dashboard" iconName="LayoutDashboard" isSelected />
        <MenuItem label="Projects" iconName="Folder" iconRight="ChevronRight" />
        <MenuItem label="Tasks" iconName="CheckSquare" tag={{ label: "5" }} />
        <MenuItem label="Messages" iconName="MessageSquare" tag={{ label: "12" }} />
        <MenuItem label="Reports" iconName="BarChart2" />
        <MenuItem label="Settings" iconName="Settings" />
      </Navigation>
    </div>
  ),
};
