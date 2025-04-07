import { BasePage } from './BasePage.js';

export class AlbumPage extends BasePage {
  constructor(settings = {}) {
    super(settings);
  }

  init() {
    super.init();
    
    this.setupStickyPlayer(); 
  }

  static isMatch() {
    return !!document.querySelector('.inline_player');
  }

  setupAutoPlayNext() {
    // Disable on album pages as Bandcamp has it's own auto-play
  }

  applySettingsChanges(changes) {
    super.applySettingsChanges(changes);
    
    if (changes.stickyPlayer !== undefined) {
      this.setupStickyPlayer();
    }
  }

  togglePlayPause() {
    document.querySelector('.playbutton, .playpause')?.click();
  }

  setupStickyPlayer() {
    const player = document.querySelector('.inline_player');
    if (!player) {
      return;
    }

    if (!this.settings.stickyPlayer) {
      player.style.position = '';
      player.style.top = '';
      player.style.zIndex = '';
      return;
    }

    if (this.settings.stickyPlayer) {
      player.style.position = 'sticky';
      player.style.top = '55px';
      player.style.zIndex = 1000;           

      const styleElement = document.getElementById('custom-design-rules-style');
      if (styleElement) {
        try {
          const designData = JSON.parse(styleElement.getAttribute('data-design'));
          if (designData.body_color) {
            player.style.backgroundColor = `#${designData.body_color}`;
          }
        } catch (e) {
          console.error('Error parsing design data:', e);
        }
      }
    }
  }
  
  nextSong() {
    const nextButton = document.querySelector('.nextbutton');
    if (nextButton) {
      nextButton.click();
    } else {
      super.nextSong();
    }
  }

  prevSong() {
    const prevButton = document.querySelector('.prevbutton');
    if (prevButton) {
      prevButton.click();
    } else {
      super.prevSong();
    }
  }
}
