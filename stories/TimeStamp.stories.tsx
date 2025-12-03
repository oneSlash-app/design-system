import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TimeStamp from "../components/timeStamp";

const meta: Meta<typeof TimeStamp> = {
  title: "Components/TimeStamp",
  component: TimeStamp,
  argTypes: {
    dateFormat: {
      control: "select",
      options: ["absolute", "relative"],
    },
    textSize: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    textColor: {
      control: "select",
      options: ["secondary", "primary"],
    },
    data: {
      control: "select",
      options: ["date-and-time", "date", "time"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TimeStamp>;

const now = new Date();
const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

export const AbsoluteDateAndTime: Story = {
  args: {
    createdAt: oneDayAgo,
    dateFormat: "absolute",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time",
  },
};

export const AbsoluteDateOnly: Story = {
  args: {
    createdAt: oneWeekAgo,
    dateFormat: "absolute",
    textSize: "small",
    textColor: "secondary",
    data: "date",
  },
};

export const AbsoluteTimeOnly: Story = {
  args: {
    createdAt: oneHourAgo,
    dateFormat: "absolute",
    textSize: "small",
    textColor: "secondary",
    data: "time",
  },
};

export const RelativeRecent: Story = {
  args: {
    createdAt: new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
    dateFormat: "relative",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time",
  },
};

export const RelativeHours: Story = {
  args: {
    createdAt: oneHourAgo,
    dateFormat: "relative",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time",
  },
};

export const RelativeDays: Story = {
  args: {
    createdAt: oneDayAgo,
    dateFormat: "relative",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time",
  },
};

export const RelativeWeeks: Story = {
  args: {
    createdAt: oneWeekAgo,
    dateFormat: "relative",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time",
  },
};

export const RelativeMonths: Story = {
  args: {
    createdAt: oneMonthAgo,
    dateFormat: "relative",
    textSize: "small",
    textColor: "secondary",
    data: "date-and-time",
  },
};

export const PrimaryColor: Story = {
  args: {
    createdAt: oneDayAgo,
    dateFormat: "relative",
    textSize: "medium",
    textColor: "primary",
    data: "date-and-time",
  },
};

export const LargeSize: Story = {
  args: {
    createdAt: oneDayAgo,
    dateFormat: "absolute",
    textSize: "large",
    textColor: "primary",
    data: "date-and-time",
  },
};

export const AllFormats: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div>
        <strong>Absolute - Date and Time:</strong>
        <TimeStamp createdAt={oneDayAgo} dateFormat="absolute" data="date-and-time" />
      </div>
      <div>
        <strong>Absolute - Date only:</strong>
        <TimeStamp createdAt={oneDayAgo} dateFormat="absolute" data="date" />
      </div>
      <div>
        <strong>Absolute - Time only:</strong>
        <TimeStamp createdAt={oneHourAgo} dateFormat="absolute" data="time" />
      </div>
      <div>
        <strong>Relative:</strong>
        <TimeStamp createdAt={oneDayAgo} dateFormat="relative" data="date-and-time" />
      </div>
    </div>
  ),
};
