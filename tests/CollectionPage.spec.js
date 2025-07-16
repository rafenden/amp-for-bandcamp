import { test } from './fixtures.js';

test('spacebar plays and pauses audio', async ({ page }) => {
  await page.goto('https://bandcamp.com/amp-for-bandcamp');
  await page.waitForLoadState('networkidle');

  await page.keyboard.press('Space');
  await page.waitForSelector('.playpause .pause');

  await page.keyboard.press('Space');
  await page.waitForSelector('.playpause .play');
});
