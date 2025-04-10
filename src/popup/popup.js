import { DEFAULT_SETTINGS } from '../constants.js';

const stickyPlayerToggle = document.getElementById('stickyPlayer');
const autoPlayNextToggle = document.getElementById('autoPlayNext');
const showLeaveWarningToggle = document.getElementById('showLeaveWarning');
const showProgressBarToggle = document.getElementById('showProgressBar');
const enableKeyboardShortcutsToggle = document.getElementById('enableKeyboardShortcuts');
const seekSecondsInput = document.getElementById('seekSeconds');

document.addEventListener('DOMContentLoaded', () => {
  browser.storage.sync.get(DEFAULT_SETTINGS).then(items => {
    stickyPlayerToggle.checked = items.stickyPlayer;
    autoPlayNextToggle.checked = items.autoPlayNext;
    showLeaveWarningToggle.checked = items.showLeaveWarning;
    showProgressBarToggle.checked = items.showProgressBar;
    enableKeyboardShortcutsToggle.checked = items.enableKeyboardShortcuts;
    seekSecondsInput.value = items.seekSeconds;
  }).catch(console.error);
});

stickyPlayerToggle.addEventListener('change', () => {
  browser.storage.sync.set({ stickyPlayer: stickyPlayerToggle.checked })
    .catch(console.error);
});

autoPlayNextToggle.addEventListener('change', () => {
  browser.storage.sync.set({ autoPlayNext: autoPlayNextToggle.checked })
    .catch(console.error);
});

showLeaveWarningToggle.addEventListener('change', () => {
  browser.storage.sync.set({ showLeaveWarning: showLeaveWarningToggle.checked })
    .catch(console.error);
});

showProgressBarToggle.addEventListener('change', () => {
  browser.storage.sync.set({ showProgressBar: showProgressBarToggle.checked })
    .catch(console.error);
});

enableKeyboardShortcutsToggle.addEventListener('change', () => {
  browser.storage.sync.set({ enableKeyboardShortcuts: enableKeyboardShortcutsToggle.checked })
    .catch(console.error);
});

seekSecondsInput.addEventListener('change', () => {
  const value = Math.min(Math.max(parseInt(seekSecondsInput.value) || 30, 5), 60);
  seekSecondsInput.value = value;
  browser.storage.sync.set({ seekSeconds: value })
    .catch(console.error);
});
