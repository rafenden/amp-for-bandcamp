
class CollectionPage extends BasePage {
  constructor(settings = {}) {
    super(settings);
  }

  init() {
    super.init();
  }

  static isMatch() {
    return !!document.querySelector('.collection-container');
  }

  togglePlayPause() {
    const playButtonOnPlayer = document.querySelector('.pause, .play');
    if (playButtonOnPlayer) {
      playButtonOnPlayer.click();
    } else {
      document.querySelector('.track_play_auxiliary')?.click();
    }
  }

  nextSong() {
    const nextTrack = document.querySelector('.collection-item-container.playing')?.nextElementSibling?.querySelector('.track_play_auxiliary');
    if (nextTrack) {
      nextTrack.click();
      nextTrack.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      super.nextSong();
    }
  }

  prevSong() {
    const prevTrack = document.querySelector('.collection-item-container.playing')?.previousElementSibling?.querySelector('.track_play_auxiliary');
    if (prevTrack) {
      prevTrack.click();
      prevTrack.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      super.prevSong();
    }
  }
}
