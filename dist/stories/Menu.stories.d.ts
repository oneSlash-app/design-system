import type { Meta, StoryObj } from "@storybook/react";
import Menu from "../components/menu";
declare const meta: Meta<typeof Menu>;
export default meta;
type Story = StoryObj<typeof Menu>;
export declare const Default: Story;
export declare const WithSelectedItem: Story;
export declare const WithTags: Story;
