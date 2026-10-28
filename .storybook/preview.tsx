import React, { useLayoutEffect, useState } from "react";
import type { Preview } from "@storybook/react";
// Compile the source CSS so Tailwind regenerates classes as components change
import "../index.css";

import "../dist/tokens.css";
import defaultCss from "../dist/themes/default.css?inline";
import forestCss from "../dist/themes/forest.css?inline";
import clayCss from "../dist/themes/clay.css?inline";
import indigoCss from "../dist/themes/indigo.css?inline";
import wineCss from "../dist/themes/wine.css?inline";

const themeCss: Record<string, string> = { default: defaultCss, forest: forestCss, clay: clayCss, indigo: indigoCss, wine: wineCss };

// The theme file begins with an @import of tokens.css, which is loaded above
// and would 404 relative to the page if left in the injected style.
const stripImport = (css: string) => css.replace(/@import\s+["']\.\.\/tokens\.css["'];?/, "");

const readBackground = () =>
  `rgb(${getComputedStyle(document.documentElement).getPropertyValue("--os-color-background-default")})`;

const ThemeWrapper = ({ children, theme, brand }: { children: React.ReactNode; theme: string; brand: string }) => {
  const [background, setBackground] = useState("");

  // Inject the brand's theme before paint so the background read sees it
  useLayoutEffect(() => {
    let el = document.getElementById("os-theme") as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = "os-theme";
      document.head.appendChild(el);
    }
    el.textContent = stripImport(themeCss[brand] ?? defaultCss);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    const bg = readBackground();
    setBackground(bg);
    document.body.style.backgroundColor = bg;
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.minHeight = "100vh";
  }, [theme, brand]);

  return (
    <div
      className={theme}
      style={{
        padding: "1rem",
        minHeight: "100vh",
        backgroundColor: background,
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
    brand: {
      description: "Brand theme",
      toolbar: {
        title: "Brand",
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default" },
          { value: "forest", title: "Forest" },
          { value: "clay", title: "Clay" },
          { value: "indigo", title: "Indigo" },
          { value: "wine", title: "Wine" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    brand: "default",
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      const brand = context.globals.brand || "default";

      return (
        <ThemeWrapper theme={theme} brand={brand}>
          <Story />
        </ThemeWrapper>
      );
    },
  ],
};

export default preview;
