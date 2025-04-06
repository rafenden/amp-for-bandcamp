
class FeedPage extends BasePage {
  constructor(settings = {}) {
    super(settings);
  }

  init() {
    super.init();
  }

  static isMatch() {
    return !!document.querySelector('#stories');
  }

  togglePlayPause() {
    document.querySelector('.track_play_hilite.playing .tralbum-art-large, .track_play_hilite.paused:last-child .tralbum-art-large, .track_play_hilite .tralbum-art-large')?.click();
  }

  nextSong() {
    const nextTrack = document.querySelector('.collection-item-container.playing')?.parentElement?.nextElementSibling?.querySelector('.tralbum-art-large');
    if (nextTrack) {
      nextTrack.click();
      nextTrack.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  prevSong() {
    const prevTrack = document.querySelector('.collection-item-container.playing')?.parentElement?.prevElementSibling?.querySelector('.tralbum-art-large');
    if (prevTrack) {
      prevTrack.click();
      prevTrack.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
