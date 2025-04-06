class BasePage {
  constructor(settings = {}) {
    this.id = 'bandcamp-tuned-base-page';
    this.settings = {
      stickyPlayer: true,
      autoPlayNext: true,
      seekSeconds: 30,
      ...settings
    };
    this.audioElement = null;
    this.beforeUnloadHandler = null;
  }
  
  init() {
    this.setupControls();
    this.setupPageLeaveWarning();

    if (this.settings.autoPlayNext) {
      this.setupAutoPlayNext();
    }

    this.setupSettingsListeners();
  }

  setupSettingsListeners() {
    // Make sure browser is defined
    if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
      window.browser = chrome;
    }

    try {
      browser.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') {
          console.log('Settings changed:', changes);
          
          for (let key in changes) {
            this.settings[key] = changes[key].newValue;
          }

          this.applySettingsChanges(changes);
        }
      });
    } catch (error) {
      console.error('Error setting up settings listener:', error);
    }
  }

  applySettingsChanges(changes) {

    if (changes.autoPlayNext) {
      if (changes.autoPlayNext.newValue) {
        this.setupAutoPlayNext();
      }
    }
  }

  static isMatch() {
    return false;
  }

  setupControls() {
    document.addEventListener('keydown', (e) => {

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      // Handle key presses by key code
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.togglePlayPause();
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.fastForward();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.rewind();
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.prevSong();
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.nextSong();
          break;
        case 'KeyN':
          e.preventDefault();
          this.nextSong();
          break;
        case 'KeyP':
          e.preventDefault();
          this.prevSong();
          break;
      }
    });
  }

  setupAutoPlayNext() {
    setInterval(() => {
      const audio = document.querySelector('audio');
      if (audio && audio.duration - audio.currentTime <= 1) {
        this.nextSong();
      }
    }, 1000);
  }

  fastForward() {
    const audio = document.querySelector('audio');
    const seekTime = this.settings.seekSeconds;
    
    if (audio && audio.duration - audio.currentTime > seekTime) {
      audio.currentTime += seekTime;
    } else if (audio) {
      audio.currentTime = audio.duration - 1;
    }
  }

  rewind() {
    const audio = document.querySelector('audio');
    const seekTime = this.settings.seekSeconds;
    
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - seekTime);
    }
  }

  togglePlayPause() {}

  nextSong() {}

  prevSong() {}

  setupPageLeaveWarning() {
    // Store the handler reference so we can remove it later
    this.beforeUnloadHandler = (e) => {
      // Get the audio element if we don't have it
      if (!this.audioElement) {
        this.audioElement = document.querySelector('audio');
      }
      
      if (this.audioElement && !this.audioElement.paused) {
        e.preventDefault();
        e.returnValue = '';
        return 'Are you sure you want to leave? Music is still playing.';
      }
    };

    // Add the event listener
    window.addEventListener('beforeunload', this.beforeUnloadHandler);

    // Set up a MutationObserver to watch for audio element changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const audio = document.querySelector('audio');
          if (audio) {
            this.audioElement = audio;
          }
        }
      });
    });

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Clean up when the page is unloaded
    window.addEventListener('unload', () => {
      window.removeEventListener('beforeunload', this.beforeUnloadHandler);
      observer.disconnect();
    });
  }
}
