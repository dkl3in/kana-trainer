# Kana & Kanji Trainer

A Progressive Web App (PWA) for learning the Japanese scripts Hiragana, Katakana, and JLPT N5 Kanji.

## Features

### Home screen
- Choose between **Kana** (Hiragana & Katakana) and **Kanji N5** (85 characters)
- Overall progress of both sections at a glance

### Quiz (Kana & Kanji)
- Multiple choice with 8 answer options
- Auto-advance timer
- Weighted random system: incorrectly answered characters appear more frequently
- **Kana:** Hiragana / Katakana / Mixed modes
- **Kanji:** Meaning (Kanji → English) and Reading (Kanji → On'yomi · Kun'yomi) modes
- **Block mode:** start practising a specific block directly from the Learn view

### Learn (Kana & Kanji)
- Interactive 3D flip cards, grouped by character group
- Kana: Kana → Romaji or Romaji → Kana
- Kanji: Kanji → Meaning or Meaning → Kanji; back side shows meaning, On'yomi, Kun'yomi, and example word
- "Practise this block" button per group

### Overview (Kana & Kanji)
- Kana: full Gojūon table (五十音), Dakuten and Yōon grids
- Kanji: all 85 N5 Kanji grouped by category
- Zoom modal: large character, all readings, meanings, and example word
- Navigation by swipe (touch) or arrow keys

### Stats (Kana & Kanji)
- Progress bars per group / mode
- Error list (sorted descending by error count)
- Badges for learning milestones
- Reset progress with confirmation dialog

### Level system
- Characters are unlocked in packs of 8
- A pack is considered mastered when all characters have streak ≥ 2
- Kana extras (Dakuten + Yōon) only unlock after the full base is mastered

### PWA
- Installable on mobile and desktop
- Fully usable offline (Service Worker via Workbox)
- Optimised for mobile devices including safe-area support

## Tech Stack

| Technology | Purpose |
|---|---|
| [Vue 3](https://vuejs.org/) | UI framework, exclusively `<script setup>` SFCs |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Vue Router 4](https://router.vuejs.org/) | Hash-based routing |
| [vue-i18n 11](https://vue-i18n.intlify.dev/) | Internationalisation (DE / EN) |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | Service Worker & Web App Manifest |
| [Iconify / Carbon Icons](https://icon-sets.iconify.design/carbon/) | Icons |

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173/kana-trainer/)
npm run dev

# Create production build
npm run build

# Preview production build locally
npm run preview

# Run linting (must report 0 errors)
npm run lint

# Run tests (54 data-integrity tests)
npm run test

# Generate PWA PNG icons from public/favicon.svg
npm run generate-icons
```

## Code Quality

| Tool | Purpose | Config |
|---|---|---|
| ESLint | Linting (Vue + JS) | `eslint.config.js` — flat config, browser globals, `eslint-plugin-vue` |
| Vitest | Data-integrity tests | `vite.config.js` → `test: { environment: 'node' }` |

### Test files

| File | Scope | Tests |
|---|---|---|
| `src/kana.test.js` | `kana.js` data integrity | 29 |
| `src/kanji.test.js` | `kanji.js` data integrity | 25 |

## Definition of Done

A task is only considered complete when **all** of the following conditions are met:

```bash
npm run lint   # 0 errors
npm run test   # all tests green
npm run build  # exit code 0
```

