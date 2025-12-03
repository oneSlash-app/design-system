import React from "react";
import TimeStamp from "../components/timeStamp";
var meta = {
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
var now = new Date();
var oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
var oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
var oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
var oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
export var AbsoluteDateAndTime = {
    args: {
        createdAt: oneDayAgo,
        dateFormat: "absolute",
        textSize: "small",
        textColor: "secondary",
        data: "date-and-time",
    },
};
export var AbsoluteDateOnly = {
    args: {
        createdAt: oneWeekAgo,
        dateFormat: "absolute",
        textSize: "small",
        textColor: "secondary",
        data: "date",
    },
};
export var AbsoluteTimeOnly = {
    args: {
        createdAt: oneHourAgo,
        dateFormat: "absolute",
        textSize: "small",
        textColor: "secondary",
        data: "time",
    },
};
export var RelativeRecent = {
    args: {
        createdAt: new Date(now.getTime() - 5 * 60 * 1000), // 5 minutes ago
        dateFormat: "relative",
        textSize: "small",
        textColor: "secondary",
        data: "date-and-time",
    },
};
export var RelativeHours = {
    args: {
        createdAt: oneHourAgo,
        dateFormat: "relative",
        textSize: "small",
        textColor: "secondary",
        data: "date-and-time",
    },
};
export var RelativeDays = {
    args: {
        createdAt: oneDayAgo,
        dateFormat: "relative",
        textSize: "small",
        textColor: "secondary",
        data: "date-and-time",
    },
};
export var RelativeWeeks = {
    args: {
        createdAt: oneWeekAgo,
        dateFormat: "relative",
        textSize: "small",
        textColor: "secondary",
        data: "date-and-time",
    },
};
export var RelativeMonths = {
    args: {
        createdAt: oneMonthAgo,
        dateFormat: "relative",
        textSize: "small",
        textColor: "secondary",
        data: "date-and-time",
    },
};
export var PrimaryColor = {
    args: {
        createdAt: oneDayAgo,
        dateFormat: "relative",
        textSize: "medium",
        textColor: "primary",
        data: "date-and-time",
    },
};
export var LargeSize = {
    args: {
        createdAt: oneDayAgo,
        dateFormat: "absolute",
        textSize: "large",
        textColor: "primary",
        data: "date-and-time",
    },
};
export var AllFormats = {
    render: function () { return (<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div>
        <strong>Absolute - Date and Time:</strong>
        <TimeStamp createdAt={oneDayAgo} dateFormat="absolute" data="date-and-time"/>
      </div>
      <div>
        <strong>Absolute - Date only:</strong>
        <TimeStamp createdAt={oneDayAgo} dateFormat="absolute" data="date"/>
      </div>
      <div>
        <strong>Absolute - Time only:</strong>
        <TimeStamp createdAt={oneHourAgo} dateFormat="absolute" data="time"/>
      </div>
      <div>
        <strong>Relative:</strong>
        <TimeStamp createdAt={oneDayAgo} dateFormat="relative" data="date-and-time"/>
      </div>
    </div>); },
};
