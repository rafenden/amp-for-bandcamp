async function init() {
  try {
    const { DEFAULT_SETTINGS } = await import('../constants.js');
    const { AlbumPage } = await import('../content-pages/AlbumPage.js');
    const { CollectionPage } = await import('../content-pages/CollectionPage.js');
    const { FeedPage } = await import('../content-pages/FeedPage.js');
    
    const settings = await browser.storage.sync.get(DEFAULT_SETTINGS);
    if (AlbumPage.isMatch()) {
      new AlbumPage(settings).init();
    } else if (CollectionPage.isMatch()) {
      new CollectionPage(settings).init();
    } else if (FeedPage.isMatch()) {
      new FeedPage(settings).init();
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
