import { BasePage } from './BasePage.js';

export class AlbumPage extends BasePage {
  constructor(settings = {}) {
    super(settings);
  }

  init() {
    super.init();
    
    if (this.settings.stickyPlayer) {
      this.makePlayerSticky();
    }
  }

  static isMatch() {
    return !!document.querySelector('.inline_player');
  }

  setupAutoPlayNext() {
    // Disable autm pages as Bandcamp has it's own auto-play
  }

  applySettingsChanges(changes) {
    super.applySettingsChanges(changes);

    if (changes.stickyPlayer) {
      if (changes.stickyPlayer.newValue) {
        this.makePlayerSticky();
      } else {

        const player = document.querySelector('.inline_player');
        if (player) {
          player.style.position = '';
          player.style.top = '';
          player.style.zIndex = '';
          player.style.backgroundColor = '';
        }
      }
    }
  }

  togglePlayPause() {
    document.querySelector('.playbutton, .playpause')?.click();
  }

  makePlayerSticky() {
    const player = document.querySelector('.inline_player');
    if (player && player.style.position !== 'sticky') {
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
  
    const showMore = document.querySelector('.show-more');
    if (showMore && window.getComputedStyle(showMore).display === 'block') {
      showMore.click();
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
