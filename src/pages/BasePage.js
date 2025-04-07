class BasePage {
  constructor(settings = {}) {
    this.settings = {
      stickyPlayer: true,
      autoPlayNext: true,
      showLeaveWarning: true,
      showProgressBar: true,
      seekSeconds: 30,
      ...settings
    };
  }
  
  init() {
    this.setupKeyboardShortcuts();
    this.setupSettingsListeners();
    this.setupAutoPlayNext();
    this.setupPageLeaveWarning();
  }

  static isMatch() {
    return false;
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {

      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

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

  setupSettingsListeners() {
    try {
      browser.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') {
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
    if (changes.autoPlayNext && changes.autoPlayNext.newValue) {
      this.setupAutoPlayNext();
    }

    if (changes.showLeaveWarning && changes.showLeaveWarning.newValue) {
      this.setupPageLeaveWarning();
    }
  }

  setupAutoPlayNext() {
    if (!this.settings.autoPlayNext) {
      return;
    }

    setInterval(() => {
      const audio = document.querySelector('audio');
      if (audio && audio.duration - audio.currentTime <= 1) {
        this.nextSong();
      }
    }, 1000);
  }

  setupPageLeaveWarning() {
    const handler = (e) => {
      const audio = document.querySelector('audio');
      if (audio && !audio.paused) {
        const message = 'Music is still playing. Are you sure you want to leave?';
        e.returnValue = message;
        return message;
      }
    };

    window.removeEventListener('beforeunload', handler);
    if (this.settings.showLeaveWarning) {
      window.addEventListener('beforeunload', handler);
    }
  }
}
