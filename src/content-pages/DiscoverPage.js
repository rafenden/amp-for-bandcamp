import { BasePage } from './BasePage.js';

export class DiscoverPage extends BasePage {
  constructor(settings = {}) {
    super(settings);
  }

  init() {
    super.init();
  }

  static isMatch() {
    return !!document.querySelector('#DiscoverApp');
  }

  togglePlayPause() {
    document.querySelector('.focused-result .play-pause-button')?.click();
  }

  nextSong() {
    const currentTrack = document
      .querySelector('.pause-circle-outline-icon')
      .closest('.results-grid-item');
    const nextTrack =
      currentTrack?.nextElementSibling?.querySelector('.play-pause-button');
    if (nextTrack) {
      nextTrack.click();
      nextTrack.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      super.nextSong();
    }
  }

  prevSong() {
    const currentTrack = document
      .querySelector('.pause-circle-outline-icon')
      .closest('.results-grid-item');
    const prevTrack =
      currentTrack?.previousElementSibling?.querySelector('.play-pause-button');
    if (prevTrack) {
      prevTrack.click();
      prevTrack.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      super.nextSong();
    }
  }
}
