class FeedPage extends BasePage {
  constructor(settings = {}) {
    super(settings);
    this.progressBarContainer = null; // To keep track of the current progress bar
  }

  init() {
    super.init();
    // Setup progress bar - moved from BasePage
    if (this.settings.showProgressBar) {
      this.setupProgressBar();
    }
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

  setupProgressBar() {
    const audio = document.querySelector('audio');
    if (!audio) return;

    const createOrUpdateProgressBar = (target) => {
      if (!target) return;
      
      // Remove existing progress bar if it's in a different container
      if (this.progressBarContainer && this.progressBarContainer.parentElement !== target) {
        this.progressBarContainer.remove();
        this.progressBarContainer = null;
      }

      // Create progress bar if needed
      if (!this.progressBarContainer) {
        this.progressBarContainer = document.createElement('div');
        this.progressBarContainer.className = 'playback-progress';
        this.progressBarContainer.style.display = 'block';
        
        const innerBar = document.createElement('div');
        innerBar.className = 'playback-progress-inner';
        this.progressBarContainer.appendChild(innerBar);
        
        // Append to appropriate container
        const container = target.querySelector('.story-body') || target;
        container.appendChild(this.progressBarContainer);
      }
      
      // Ensure visibility and update
      this.progressBarContainer.style.display = 'block';
      updateProgress();
    };

    const updateProgress = () => {
      if (audio.duration && this.progressBarContainer) {
        const progress = (audio.currentTime / audio.duration) * 100;
        const innerBar = this.progressBarContainer.querySelector('.playback-progress-inner');
        if (innerBar) innerBar.style.width = `${progress}%`;
      }
    };

    const findPlayingContainer = () => {
      return document.querySelector('.collection-item-container.playing, .story-innards.playing') || 
             document.querySelector('.track_play_hilite.playing')?.closest('.collection-item-container, .story-innards') ||
             document.querySelector('[data-playing="true"]')?.closest('.collection-item-container, .story-innards');
    };

    // Event Listeners
    audio.addEventListener('play', () => {
      const container = findPlayingContainer();
      if (container) createOrUpdateProgressBar(container);
    });

    audio.addEventListener('pause', updateProgress);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
      if (this.progressBarContainer) this.progressBarContainer.style.display = 'none';
    });
     
    // Initial check for already playing audio
    if (!audio.paused) {
      const container = findPlayingContainer();
      if (container) createOrUpdateProgressBar(container);
    }
  }
  
  // Override applySettingsChanges to handle progress bar setting
  applySettingsChanges(changes) {
    super.applySettingsChanges(changes);
    
    // Handle progress bar setting specifically for feed page
    if (changes.showProgressBar !== undefined) {
      if (changes.showProgressBar.newValue) {
        // Re-enable progress bar
        this.setupProgressBar();
      } else {
        // Hide and remove progress bar if it exists
        if (this.progressBarContainer) {
          this.progressBarContainer.remove();
          this.progressBarContainer = null;
          console.log("Bandcamp Tuned: Removed progress bar due to setting change");
        }
      }
    }
  }
}
