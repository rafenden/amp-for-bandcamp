# Amp for Bandcamp - Browser Extension

A multi-browser extension (Chrome, Firefox, Safari) that amplifies Bandcamp functionality with playback controls and UI improvements.

> **Disclaimer**: This extension is not affiliated with, endorsed by, or connected to Bandcamp or Epic Games. It is an independent project designed to enhance the user experience on Bandcamp.


## Features

- Auto-play next song when current song ends
- Sticky inline player that stays visible as you scroll on the album page
- Keyboard shortcuts for playback control:
  - **Space**: Play/pause
  - **Up Arrow**: Next track
  - **Down Arrow**: Previous track
  - **Right Arrow**: Fast forward
  - **Left Arrow**: Rewind

## Installation

### Chrome/Edge/Opera
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the extension directory
5. The extension should now be installed and active

### Firefox
1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on..."
4. Select any file in the extension directory
5. The extension should now be installed and active (note: this is temporary and will be removed when Firefox is closed)

### Safari
1. Download or clone this repository
2. Install Xcode from the Mac App Store
3. Open the Xcode project:
   ```bash
   open "xcode/Amp for Bandcamp.xcodeproj"
   ```
4. Build and run the project in Xcode
5. Enable the extension in Safari preferences:
   - Safari > Settings > Extensions
   - Check the box next to "Amp for Bandcamp"

## Building

This project includes npm scripts to help with building the extension for different browsers.

### Prerequisites

- Node.js (for running build scripts)
- Xcode (for Safari extension)
- zip command-line utility (for Chrome/Firefox packages)

### Build Commands

```bash
# Build for all platforms
npm run build

# Build ZIP file for Chrome/Firefox
npm run build:zip

# Build Safari extension with xcodebuild
npm run build:safari
```

All build artifacts will be placed in the `dist` directory:
- `dist/amp-for-bandcamp.zip` - Chrome/Firefox extension package
- `dist/safari` - Safari build output (compiled extension)

