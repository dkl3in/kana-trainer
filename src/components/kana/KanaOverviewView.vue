<template>
  <div class="overview">
    <div class="overview__controls mode-tabs-wrap">
      <div class="mode-tabs">
        <button class="mode-tabs__btn" :class="{ 'mode-tabs__btn--active': script === 'hiragana' }" @click="script = 'hiragana'">あ</button>
        <button class="mode-tabs__btn" :class="{ 'mode-tabs__btn--active': script === 'katakana' }" @click="script = 'katakana'">ア</button>
      </div>
    </div>

    <!-- Gojūon table -->
    <h3 class="overview__section-title">Gojūon (五十音)</h3>
    <div class="overview-table" role="table">
      <!-- Column headers -->
      <div class="overview-cell overview-cell--header" role="columnheader"></div>
      <div
        v-for="col in COLS"
        :key="col"
        class="overview-cell overview-cell--header"
        role="columnheader"
      >{{ col }}</div>

      <!-- Data rows -->
      <template v-for="row in tableRows" :key="row.consonant + script">
        <div class="overview-cell overview-cell--row-header" role="rowheader">{{ row.consonant }}</div>
        <div
          v-for="(cell, ci) in row.cells"
          :key="ci"
          class="overview-cell"
          :class="{ 'overview-cell--empty': !cell, 'overview-cell--clickable': !!cell }"
          role="cell"
          @click="cell && openZoom(cell)"
        >
          <template v-if="cell">
            <span class="overview-cell__kana">{{ cell.kana }}</span>
            <span class="overview-cell__romaji">{{ cell.romaji }}</span>
          </template>
        </div>
      </template>
    </div>

    <!-- Dakuten section -->
    <h3 class="overview__section-title">Dakuten &amp; Handakuten</h3>
    <div class="overview-grid">
      <div
        v-for="item in dakutenItems"
        :key="item.kana"
        class="overview-mini-cell overview-cell--clickable"
        @click="openZoom(item)"
      >
        <span class="overview-cell__kana">{{ item.kana }}</span>
        <span class="overview-cell__romaji">{{ item.romaji }}</span>
      </div>
    </div>

    <!-- Yōon section -->
    <h3 class="overview__section-title">Yōon (拗音)</h3>
    <div class="overview-grid">
      <div
        v-for="item in yoonItems"
        :key="item.kana"
        class="overview-mini-cell overview-cell--clickable"
        @click="openZoom(item)"
      >
        <span class="overview-cell__kana">{{ item.kana }}</span>
        <span class="overview-cell__romaji">{{ item.romaji }}</span>
      </div>
    </div>
  </div>

  <!-- Zoom Modal -->
  <Teleport to="body">
    <div
      v-if="selectedCell"
      class="zoom-overlay"
      @click="onOverlayClick"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
    >
      <button class="zoom-close" @click.stop="closeZoom" aria-label="Schließen">✕</button>
      <div class="zoom-card">
        <span class="zoom-card__kana">{{ selectedCell.kana }}</span>
        <span class="zoom-card__romaji">{{ selectedCell.romaji }}</span>
      </div>
      <p class="zoom-hint">← Wischen zum Navigieren →</p>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  baseHiragana, baseKatakana,
  extraHiragana, extraKatakana,
  yoonHiragana, yoonKatakana,
  GOUJUON_TABLE_ROWS
} from '../../kana.js'

const script = ref('hiragana')

const COLS = ['a', 'i', 'u', 'e', 'o']

const tableRows = computed(() => {
  const arr = script.value === 'hiragana' ? baseHiragana : baseKatakana
  return GOUJUON_TABLE_ROWS.map(row => ({
    consonant: row.consonant,
    cells: row.slots.map(idx =>
      idx !== null ? { kana: arr[idx][0], romaji: arr[idx][1] } : null
    )
  }))
})

const dakutenItems = computed(() => {
  const arr = script.value === 'hiragana' ? extraHiragana : extraKatakana
  return arr.map(([kana, romaji]) => ({ kana, romaji }))
})

const yoonItems = computed(() => {
  const arr = script.value === 'hiragana' ? yoonHiragana : yoonKatakana
  return arr.map(([kana, romaji]) => ({ kana, romaji }))
})

// Flat ordered list of all zoomable items
const allZoomItems = computed(() => {
  const items = []
  for (const row of tableRows.value) {
    for (const cell of row.cells) {
      if (cell) items.push(cell)
    }
  }
  items.push(...dakutenItems.value)
  items.push(...yoonItems.value)
  return items
})

// Zoom modal
const selectedIndex = ref(-1)
const selectedCell = computed(() =>
  selectedIndex.value >= 0 ? allZoomItems.value[selectedIndex.value] : null
)

let touchStartX = 0
let swipeHandled = false

function openZoom(cell) {
  const idx = allZoomItems.value.findIndex(i => i.kana === cell.kana)
  selectedIndex.value = idx >= 0 ? idx : 0
}

function closeZoom() {
  selectedIndex.value = -1
}

function navigate(delta) {
  const len = allZoomItems.value.length
  selectedIndex.value = (selectedIndex.value + delta + len) % len
}

function onOverlayClick() {
  if (!swipeHandled) closeZoom()
  swipeHandled = false
}

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
  swipeHandled = false
}

function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 50) {
    navigate(dx < 0 ? 1 : -1)
    swipeHandled = true
    e.preventDefault()
  }
}

function onKeyDown(e) {
  if (!selectedCell.value) return
  if (e.key === 'Escape') closeZoom()
  if (e.key === 'ArrowRight') navigate(1)
  if (e.key === 'ArrowLeft') navigate(-1)
}

onMounted(() => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))
</script>
