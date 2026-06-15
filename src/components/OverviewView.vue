<template>
  <div class="overview">
    <div class="overview__controls">
      <button
        class="learn__toggle"
        :class="{ 'learn__toggle--active': script === 'hiragana' }"
        @click="script = 'hiragana'"
      >Hiragana</button>
      <button
        class="learn__toggle"
        :class="{ 'learn__toggle--active': script === 'katakana' }"
        @click="script = 'katakana'"
      >Katakana</button>
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
          :class="{ 'overview-cell--empty': !cell }"
          role="cell"
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
      <div v-for="item in dakutenItems" :key="item.kana" class="overview-mini-cell">
        <span class="overview-cell__kana">{{ item.kana }}</span>
        <span class="overview-cell__romaji">{{ item.romaji }}</span>
      </div>
    </div>

    <!-- Yōon section -->
    <h3 class="overview__section-title">Yōon (拗音)</h3>
    <div class="overview-grid">
      <div v-for="item in yoonItems" :key="item.kana" class="overview-mini-cell">
        <span class="overview-cell__kana">{{ item.kana }}</span>
        <span class="overview-cell__romaji">{{ item.romaji }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  baseHiragana, baseKatakana,
  extraHiragana, extraKatakana,
  yoonHiragana, yoonKatakana,
  GOUJUON_TABLE_ROWS
} from '../kana.js'

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
</script>
