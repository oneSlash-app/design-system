// Generated from designTokens.js by scripts/build-tokens.js. Do not edit.
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LoginPage_CenteredExample from "../cases/login-page/centered";
import LoginPage_SplitExample from "../cases/login-page/split";
import LoginPage_ProviderFirstExample from "../cases/login-page/provider-first";
import LoginPage_EmailOnlyExample from "../cases/login-page/email-only";

const meta: Meta = { title: "Cases" };
export default meta;
type Story = StoryObj;

export const LoginPage_Centered: Story = { render: () => <LoginPage_CenteredExample /> };
export const LoginPage_Split: Story = { render: () => <LoginPage_SplitExample /> };
export const LoginPage_ProviderFirst: Story = { render: () => <LoginPage_ProviderFirstExample /> };
export const LoginPage_EmailOnly: Story = { render: () => <LoginPage_EmailOnlyExample /> };
