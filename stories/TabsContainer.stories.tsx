import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TabsContainer from "../components/tabsContainer";
import Tab from "../components/tab";

const meta: Meta<typeof TabsContainer> = {
  title: "Components/TabsContainer",
  component: TabsContainer,
};

export default meta;
type Story = StoryObj<typeof TabsContainer>;

const TabsWrapper = ({ tabs, size }: { tabs: string[]; size?: "medium" | "small" | "tiny" }) => {
  const [selected, setSelected] = useState(0);

  return (
    <TabsContainer>
      {tabs.map((tab, index) => (
        <Tab
          key={tab}
          label={tab}
          size={size}
          isSelected={selected === index}
          onClickTab={() => setSelected(index)}
        />
      ))}
    </TabsContainer>
  );
};

export const Default: Story = {
  render: () => <TabsWrapper tabs={["Tab 1", "Tab 2", "Tab 3"]} />,
};

export const TwoTabs: Story = {
  render: () => <TabsWrapper tabs={["Active", "Archived"]} />,
};

export const ManyTabs: Story = {
  render: () => (
    <TabsWrapper
      tabs={["Overview", "Analytics", "Reports", "Settings", "Users", "Billing"]}
    />
  ),
};

const TabsWithIconsWrapper = () => {
  const [selected, setSelected] = useState(0);
  const tabs = [
    { label: "Home", icon: "Home" },
    { label: "Files", icon: "Folder" },
    { label: "Settings", icon: "Settings" },
  ];

  return (
    <TabsContainer>
      {tabs.map((tab, index) => (
        <Tab
          key={tab.label}
          label={tab.label}
          decoIcon={tab.icon}
          isSelected={selected === index}
          onClickTab={() => setSelected(index)}
        />
      ))}
    </TabsContainer>
  );
};

export const WithIcons: Story = {
  render: () => <TabsWithIconsWrapper />,
};

const TabsWithSecondLabelWrapper = () => {
  const [selected, setSelected] = useState(0);
  const tabs = [
    { label: "Dashboard", secondLabel: "Overview" },
    { label: "Analytics", secondLabel: "Last 7 days" },
    { label: "Reports", secondLabel: "12 new" },
  ];

  return (
    <TabsContainer>
      {tabs.map((tab, index) => (
        <Tab
          key={tab.label}
          label={tab.label}
          secondLabel={tab.secondLabel}
          isSelected={selected === index}
          onClickTab={() => setSelected(index)}
        />
      ))}
    </TabsContainer>
  );
};

export const WithSecondLabel: Story = {
  render: () => <TabsWithSecondLabelWrapper />,
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "flex-start" }}>
      <TabsWrapper tabs={["Overview", "Analytics", "Reports"]} size="medium" />
      <TabsWrapper tabs={["Overview", "Analytics", "Reports"]} size="small" />
      <TabsWrapper tabs={["Overview", "Analytics", "Reports"]} size="tiny" />
    </div>
  ),
};

export const Overflowing: Story = {
  render: () => (
    <div style={{ width: "260px" }}>
      <TabsWrapper tabs={["Overview", "Analytics", "Reports", "Settings", "Users", "Billing"]} />
    </div>
  ),
};
