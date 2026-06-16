# Kana Trainer

A Progressive Web App (PWA) for practising the Japanese scripts Hiragana and Katakana.

## Features

### Quiz
- Multiple-choice quiz for Hiragana, Katakana, or mixed
- 8 answer options per question
- Auto-advance timer (2 s on correct, 3 s on wrong)
- Weighted random system: incorrectly answered characters appear more frequently

### Learn
- All characters grouped by row (Base / Dakuten & Handakuten / Yōon)
- Interactive flip cards: front shows Kana, back shows Romaji (or vice versa)
- Switchable between Kana → Romaji and Romaji → Kana
- **Block mode:** Practise individual character rows directly from the learn view

### Overview
- Full Gojūon table (五十音) for Hiragana and Katakana
- Dakuten, Handakuten, and Yōon sections
- Click any cell to open a zoom modal with a large display
- Navigate within the modal via swipe (touch) or arrow keys

### Progress & Stats
- Level system: characters are unlocked in packs of 8
- A pack is mastered once all characters have been answered correctly 2× in a row
- Extras (Dakuten + Yōon) unlock once all base characters are mastered
- Stats tab shows progress bars and per-character error analysis
- 5 unlockable badges (e.g. "Base mastered", "50 correct")
- Reset progress with a confirmation dialog

### PWA
- Installable as an app on mobile and desktop
- Fully usable offline (Service Worker via Workbox)
- Optimised for mobile including safe-area support (iPhone notch / home bar)

## Tech Stack

- [Vue 3](https://vuejs.org/) with `<script setup>` SFCs
- [Vite](https://vitejs.dev/) as build tool
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) for Service Worker and Web App Manifest
- [Iconify / Carbon Icons](https://icon-sets.iconify.design/carbon/) for icons

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Create production build
npm run build

# Preview production build locally
npm run preview

# Generate PWA PNG icons from public/favicon.svg
npm run generate-icons
```
