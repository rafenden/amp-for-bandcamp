import { DEFAULT_SETTINGS } from '../constants.js';

const stickyPlayerToggle = document.getElementById('stickyPlayer');
const autoPlayNextToggle = document.getElementById('autoPlayNext');
const showLeaveWarningToggle = document.getElementById('showLeaveWarning');
const showProgressBarToggle = document.getElementById('showProgressBar');
const seekSecondsInput = document.getElementById('seekSeconds');

document.addEventListener('DOMContentLoaded', () => {
  browser.storage.sync.get(DEFAULT_SETTINGS).then(items => {
    stickyPlayerToggle.checked = items.stickyPlayer;
    autoPlayNextToggle.checked = items.autoPlayNext;
    showLeaveWarningToggle.checked = items.showLeaveWarning;
    showProgressBarToggle.checked = items.showProgressBar;
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

showProgressBarToggle.addEventListener('change', () => {
  browser.storage.sync.set({ showProgressBar: showProgressBarToggle.checked })
    .catch(() => {});
});

seekSecondsInput.addEventListener('change', () => {
  const value = Math.min(Math.max(parseInt(seekSecondsInput.value) || 30, 5), 60);
  seekSecondsInput.value = value;
  browser.storage.sync.set({ seekSeconds: value })
    .catch(() => {});
});
