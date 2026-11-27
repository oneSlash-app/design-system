import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Image from "../components/image";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  argTypes: {
    fit: { control: "select", options: [undefined, "cover", "contain"] },
    loading: { control: "select", options: [undefined, "lazy", "eager"] },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

const src =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="320" height="180" fill="#888"/></svg>'
  );

export const Default: Story = {
  args: { src, alt: "A grey rectangle", width: 320, height: 180 },
};

export const Decoration: Story = {
  args: { src, alt: "", width: 160, height: 90, fit: "cover" },
};
