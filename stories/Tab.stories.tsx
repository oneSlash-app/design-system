import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tab from "../components/tab";
import TabsContainer from "../components/tabsContainer";

const meta: Meta<typeof Tab> = {
  title: "Components/Tab",
  component: Tab,
  argTypes: {
    label: { control: "text" },
    isSelected: { control: "boolean" },
    decoIcon: { control: "text" },
    actionIcon: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Tab>;

export const Default: Story = {
  args: {
    label: "Tab Label",
    isSelected: false,
    onClickTab: () => {},
  },
};

export const Selected: Story = {
  args: {
    label: "Selected Tab",
    isSelected: true,
    onClickTab: () => {},
  },
};

export const WithDecoIcon: Story = {
  args: {
    label: "With Icon",
    isSelected: false,
    decoIcon: "Home",
    onClickTab: () => {},
  },
};

export const WithActionIcon: Story = {
  args: {
    label: "With Action",
    isSelected: false,
    actionIcon: "X",
    onClickTab: () => {},
  },
};

export const WithBothIcons: Story = {
  args: {
    label: "Full Tab",
    isSelected: true,
    decoIcon: "File",
    actionIcon: "X",
    onClickTab: () => {},
  },
};

const TabGroupWrapper = () => {
  const [selected, setSelected] = useState(0);
  const tabs = ["Overview", "Projects", "Tasks", "Settings"];

  return (
    <TabsContainer>
      {tabs.map((tab, index) => (
        <Tab
          key={tab}
          label={tab}
          isSelected={selected === index}
          onClickTab={() => setSelected(index)}
        />
      ))}
    </TabsContainer>
  );
};

export const TabGroup: Story = {
  render: () => <TabGroupWrapper />,
};
