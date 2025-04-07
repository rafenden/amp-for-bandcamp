async function init() {
  try {
    const { DEFAULT_SETTINGS } = await import('../constants.js');
    const { AlbumPage } = await import('../content-pages/AlbumPage.js');
    const { CollectionPage } = await import('../content-pages/CollectionPage.js');
    const { FeedPage } = await import('../content-pages/FeedPage.js');
    
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
  } catch (error) {
    console.error('Error initializing extension:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
