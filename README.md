# Kana & Kanji Trainer

Eine Progressive Web App (PWA) zum Lernen der japanischen Schriftsysteme Hiragana, Katakana sowie der JLPT N5 Kanji.

## Funktionen

### Hauptmenü
- Auswahl zwischen **Kana** (Hiragana & Katakana) und **Kanji N5** (85 Zeichen)
- Gesamtfortschritt beider Bereiche auf einen Blick

### Quiz (Kana & Kanji)
- Multiple-Choice mit 8 Antwortoptionen
- Auto-Weiter-Timer (2 s bei richtig, 3 s bei falsch)
- Gewichtetes Zufallssystem: falsch beantwortete Zeichen erscheinen häufiger
- **Kana:** Modi Hiragana / Katakana / Gemischt
- **Kanji:** Modi Bedeutung (Kanji → Deutsch) und Lesung (Kanji → On'yomi · Kun'yomi)
- **Block-Modus:** direkt aus der Lernansicht einen Block zum Üben starten

### Lernen (Kana & Kanji)
- Interaktive 3D-Flipkarten, nach Zeichengruppen geordnet
- Kana: Kana → Romaji oder Romaji → Kana
- Kanji: Kanji → Bedeutung oder Bedeutung → Kanji; Rückseite zeigt Bedeutung, On'yomi, Kun'yomi und Beispielwort
- „Diesen Block üben"-Button je Gruppe

### Übersicht (Kana & Kanji)
- Kana: vollständige Gojūon-Tabelle (五十音), Dakuten- und Yōon-Raster
- Kanji: alle 85 N5-Kanji nach Kategorien gruppiert
- Zoom-Modal: großes Zeichen, alle Lesungen, Bedeutungen und Beispielwort
- Navigation per Wischen (Touch) oder Pfeiltasten

### Statistik (Kana & Kanji)
- Fortschrittsbalken pro Gruppe / Modus
- Fehlerliste (absteigend nach Fehleranzahl)
- Badges für Lernerfolge
- Fortschritt zurücksetzen mit Bestätigungsdialog

### Level-System
- Zeichen werden in 8er-Paketen freigeschaltet
- Ein Paket gilt als gemeistert, wenn alle Zeichen Streak ≥ 2 haben
- Kana-Extras (Dakuten + Yōon) werden erst nach vollständiger Basis freigeschaltet

### PWA
- Installierbar auf Mobil und Desktop
- Vollständig offline nutzbar (Service Worker via Workbox)
- Optimiert für mobile Geräte inkl. Safe-Area-Unterstützung

## Tech Stack

| Technologie | Zweck |
|---|---|
| [Vue 3](https://vuejs.org/) | UI-Framework, ausschließlich `<script setup>` SFCs |
| [Vite](https://vitejs.dev/) | Build-Tool & Dev-Server |
| [Vue Router 4](https://router.vuejs.org/) | Hash-basiertes Routing |
| [vue-i18n 11](https://vue-i18n.intlify.dev/) | Internationalisierung (DE / EN) |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | Service Worker & Web App Manifest |
| [Iconify / Carbon Icons](https://icon-sets.iconify.design/carbon/) | Icons |

## Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Dev-Server starten (http://localhost:5173/kana-trainer/)
npm run dev

# Produktions-Build erstellen
npm run build

# Produktions-Build lokal vorschauen
npm run preview

# PWA-PNG-Icons aus public/favicon.svg generieren
npm run generate-icons
```

