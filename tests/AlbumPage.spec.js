import { test } from './fixtures.js';

test('spacebar plays and pauses audio', async ({ page }) => {
  await page.goto('https://rethe.bandcamp.com/album/trust-the-process');
  await page.waitForLoadState('networkidle');

  await page.keyboard.press('Space');
  await page.waitForSelector('.playbutton.playing');

  await page.keyboard.press('Space');
  await page.waitForSelector('.playbutton:not(.playing)');
});
