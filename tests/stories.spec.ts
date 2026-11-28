// Snapshots are macOS Chromium, 1024x768 @1x; regenerate on the same platform. Local gate, not run in CI.
// Verify: npm run test:visual | Update: npm run test:visual:update (needs npm run build-storybook first).
import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

// 1x1 gray PNG served for every external image so renders never depend on the network.
const PLACEHOLDER_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64',
);

const indexPath = path.resolve(__dirname, '..', 'storybook-static', 'index.json');
if (!fs.existsSync(indexPath)) {
  throw new Error(`${indexPath} not found. Run "npm run build-storybook" first.`);
}

type Entry = { id: string; type: string };
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8')) as { entries: Record<string, Entry> };
const stories = Object.values(index.entries).filter((e) => e.type === 'story');

for (const { id } of stories) {
  for (const mode of ['light', 'dark']) {
    test(`${id} ${mode}`, async ({ page }) => {
      // Stories build dates from new Date(); pin the clock so absolute times are stable.
      await page.clock.setFixedTime(new Date('2025-01-15T12:00:00Z'));
      await page.route(/^https?:\/\/(?!localhost)/, (route) =>
        route.fulfill({ contentType: 'image/png', body: PLACEHOLDER_PNG }),
      );
      await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=theme:${mode}`);
      // Alert and Modal flip classes from a timeout after mount, so a CSS transition can start after any wait
      // and leave the page on a different composited layer, which moves antialiased corners by one shade.
      // Turning transitions off makes the final state the only state.
      await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' });
      await page.waitForFunction(() => !!document.querySelector('#storybook-root')?.firstElementChild);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() =>
        Promise.all(Array.from(document.images).map((img) => img.decode().catch(() => {}))),
      );
      // Some parts start their motion a moment after mount (Alert and Modal flip their classes from a
      // timeout), so one pass can miss a transition that begins later. Finish animations frame by
      // frame until three frames in a row have none left to finish.
      await page.evaluate(async () => {
        const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        let quiet = 0;
        for (let i = 0; i < 60 && quiet < 3; i++) {
          let active = 0;
          document.getAnimations().forEach((a) => {
            try {
              if ((a.effect as AnimationEffect | null)?.getTiming().iterations === Infinity) {
                a.pause();
                a.currentTime = 0;
              } else if (a.playState !== 'finished') {
                active++;
                a.finish();
              }
            } catch {}
          });
          quiet = active ? 0 : quiet + 1;
          await frame();
          await new Promise((r) => setTimeout(r, 20));
        }
      });
      await expect(page).toHaveScreenshot(`${id}-${mode}.png`);
    });
  }
}
