function init() {
  if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
    window.browser = chrome;
  }

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
}

function loadSettings() {
  try {
    return browser.storage.sync.get({
      stickyPlayer: true,
      autoPlayNext: true,
      seekSeconds: 30
    }).catch(error => {
      console.error('Error loading settings:', error);
      return {
        stickyPlayer: true,
        autoPlayNext: true,
        seekSeconds: 30
      };
    });
  } catch (error) {
    console.error('Exception loading settings:', error);
    return Promise.resolve({
      stickyPlayer: true,
      autoPlayNext: true,
      seekSeconds: 30
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
