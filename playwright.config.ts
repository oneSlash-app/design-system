import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  snapshotPathTemplate: '{testDir}/__snapshots__/{arg}{ext}',
  fullyParallel: true,
  workers: 4,
  retries: 0,
  expect: {
    toHaveScreenshot: { maxDiffPixels: 0, animations: 'disabled' },
  },
  use: {
    baseURL: 'http://localhost:6007',
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'no-preference',
  },
  projects: [{ name: 'chromium' }],
  webServer: {
    command: 'npx http-server storybook-static -p 6007 -s',
    url: 'http://localhost:6007/index.json',
    reuseExistingServer: true,
  },
});
