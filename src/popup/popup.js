const stickyPlayerToggle = document.getElementById('stickyPlayer');
const autoPlayNextToggle = document.getElementById('autoPlayNext');
const showLeaveWarningToggle = document.getElementById('showLeaveWarning');
const seekSecondsInput = document.getElementById('seekSeconds');

document.addEventListener('DOMContentLoaded', () => {
  // Load settings
  browser.storage.sync.get({
    stickyPlayer: true,
    autoPlayNext: true,
    showLeaveWarning: true,
    seekSeconds: 30
  }).then(items => {
    stickyPlayerToggle.checked = items.stickyPlayer;
    autoPlayNextToggle.checked = items.autoPlayNext;
    showLeaveWarningToggle.checked = items.showLeaveWarning;
    seekSecondsInput.value = items.seekSeconds;
  }).catch(() => {});

  // Find and play the last paused track
  const pausedTracks = document.querySelectorAll('.story-innards.paused');
  const lastPausedTrack = pausedTracks.length > 0 ? pausedTracks[pausedTracks.length - 1] : null;
  
  if (lastPausedTrack) {
    const trackId = lastPausedTrack.dataset.trackid;
    const trackUrl = lastPausedTrack.querySelector('.item-link').href;
    
    // Send message to content script to play the track
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
      browser.tabs.sendMessage(tabs[0].id, {
        action: 'playTrack',
        trackId: trackId,
        trackUrl: trackUrl
      });
    }).catch(() => {});

    // Update UI to show track is playing
    lastPausedTrack.classList.remove('paused');
  }
});

stickyPlayerToggle.addEventListener('change', () => {
  browser.storage.sync.set({ stickyPlayer: stickyPlayerToggle.checked })
    .catch(() => {});
});

autoPlayNextToggle.addEventListener('change', () => {
  browser.storage.sync.set({ autoPlayNext: autoPlayNextToggle.checked })
    .catch(() => {});
});

showLeaveWarningToggle.addEventListener('change', () => {
  browser.storage.sync.set({ showLeaveWarning: showLeaveWarningToggle.checked })
    .catch(() => {});
});

seekSecondsInput.addEventListener('change', () => {
  const value = Math.min(Math.max(parseInt(seekSecondsInput.value) || 30, 5), 60);
  seekSecondsInput.value = value;
  browser.storage.sync.set({ seekSeconds: value })
    .catch(() => {});
});
