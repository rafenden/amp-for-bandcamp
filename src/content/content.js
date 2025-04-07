
import { DEFAULT_SETTINGS } from '../pages/constants.js'; 
import { BasePage } from '../pages/BasePage.js';
import { AlbumPage } from '../pages/AlbumPage.js';
import { CollectionPage } from '../pages/CollectionPage.js';
import { FeedPage } from '../pages/FeedPage.js';

async function init() {

  
  loadSettings().then(settings => {
    if (AlbumPage.isMatch()) {
      const page = new AlbumPage(settings);
      page.init();

    } else if (CollectionPage.isMatch()) {
      const page = new CollectionPage(settings);
      page.init();

    } else if (FeedPage.isMatch()) {
      const page = new FeedPage(settings);
      page.init();

    } else {}
  });
  
  function loadSettings() {
    try {
      return browser.storage.sync.get(DEFAULT_SETTINGS).catch(error => {
        console.error('Error loading settings:', error);
        return DEFAULT_SETTINGS;
      });
    } catch (error) {
      console.error('Exception loading settings:', error);
      return DEFAULT_SETTINGS;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
