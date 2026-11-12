import type { Meta, StoryObj } from "@storybook/react";
import PageHeader from "../components/pageHeader";
declare const meta: Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof PageHeader>;
export declare const Default: Story;
/** Level 1 (the default) renders an h1 at the largest title size. */
export declare const Level1: Story;
/** Renders an h2, one type step smaller than level 1. */
export declare const Level2: Story;
/** Renders an h3, two type steps smaller than level 1. */
export declare const Level3: Story;
