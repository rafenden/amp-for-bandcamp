import { test as base, chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

export const test = base.extend({
  context: async ({}, use) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const pathToExtension = path.join(__dirname, '..');
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    });
    await use(context);
    await context.close();
  },
});

export const expect = test.expect;
