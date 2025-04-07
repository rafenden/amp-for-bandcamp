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
    const playingTrack = document.querySelector('.track_play_hilite.playing .tralbum-art-large');
    if (playingTrack) {
      playingTrack.click();
    } else {
      const pausedTracks = document.querySelectorAll('.track_play_hilite.paused .tralbum-art-large');
      if (pausedTracks.length > 0) {
        pausedTracks[pausedTracks.length - 1].click();
      } else {
        const firstTrack = document.querySelectorAll('.track_play_hilite .tralbum-art-large')[0];
        firstTrack?.click();
      }
    }
  }

  nextSong() {
    const nextTrack = document.querySelector('.collection-item-container.playing')?.parentElement?.nextElementSibling?.querySelector('.tralbum-art-large');
    if (nextTrack) {
      nextTrack.click();
      nextTrack.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  prevSong() {
    const prevTrack = document.querySelector('.collection-item-container.playing')?.parentElement?.previousElementSibling?.querySelector('.tralbum-art-large');
    if (prevTrack) {
      prevTrack.click();
      prevTrack.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
