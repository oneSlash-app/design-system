import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import "../dist/output.css";

// Design token background colors
const backgrounds = {
  light: "#e8e8e8", // light.background.default
  dark: "#262626",  // dark.background.default
};

const ThemeWrapper = ({ children, theme }: { children: React.ReactNode; theme: string }) => {
  useEffect(() => {
    // Apply theme to document and body
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.body.style.backgroundColor = backgrounds[theme as keyof typeof backgrounds];
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.minHeight = "100vh";
  }, [theme]);

  return (
    <div
      className={theme}
      style={{
        padding: "1rem",
        minHeight: "100vh",
        backgroundColor: backgrounds[theme as keyof typeof backgrounds],
      }}
    >
      {children}
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: "fullscreen",
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      return (
        <ThemeWrapper theme={theme}>
          <Story />
        </ThemeWrapper>
      );
    },
  ],
};

export default preview;
