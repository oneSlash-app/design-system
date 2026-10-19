// Visual regression gate for every story. Snapshots in tests/__snapshots__ are generated on
// macOS Chromium at 1024x768, scale 1, and must be regenerated on the same platform
// (no platform suffix in the path). This is a local gate; it is not run in CI.
// Rendering is made deterministic (grayscale antialiasing, no font hinting) and the
// comparison is strict (per-pixel threshold 0, zero differing pixels).
// Requires storybook-static: npm run build-storybook
//   Verify: npm run test:visual
//   Update: npm run test:visual:update
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  snapshotPathTemplate: '{testDir}/__snapshots__/{arg}{ext}',
  fullyParallel: true,
  workers: 4,
  retries: 0,
  expect: {
    toHaveScreenshot: { threshold: 0, maxDiffPixels: 0, animations: 'disabled' },
  },
  use: {
    baseURL: 'http://localhost:6007',
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    timezoneId: 'UTC',
    locale: 'en-US',
    reducedMotion: 'no-preference',
    launchOptions: { args: ['--disable-lcd-text', '--font-render-hinting=none'] },
  },
  projects: [{ name: 'chromium' }],
  webServer: {
    command: 'npx http-server storybook-static -p 6007 -s',
    url: 'http://localhost:6007/index.json',
    reuseExistingServer: true,
  },
});
