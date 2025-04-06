// Make sure browser is defined
if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
  window.browser = chrome;
}

// Use chrome API if available, otherwise use browser API
const storage = chrome?.storage?.sync || browser?.storage?.sync;

const stickyPlayerToggle = document.getElementById('stickyPlayer');
const autoPlayNextToggle = document.getElementById('autoPlayNext');
const showLeaveWarningToggle = document.getElementById('showLeaveWarning');
const seekSecondsInput = document.getElementById('seekSeconds');

document.addEventListener('DOMContentLoaded', () => {
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
