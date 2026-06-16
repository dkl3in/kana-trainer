<template>
  <div class="app">
    <RouterView />
    <BottomNav />

    <!-- DEV TOOLBAR (only in development builds) -->
    <template v-if="isDev">
      <button class="dev-trigger" @click="devOpen = !devOpen" title="Dev Tools">⚙</button>
      <div v-if="devOpen" class="dev-toolbar">
        <div class="dev-toolbar__title">Dev Tools — Kana</div>
        <div class="dev-toolbar__group">
          <div class="dev-toolbar__label">Hiragana Basis</div>
          <button class="dev-toolbar__btn" @click="devAlmostMaster('hiragana', 'base')">45/46 gemeistert</button>
          <button class="dev-toolbar__btn" @click="devFullMaster('hiragana', 'base')">Alle gemeistert</button>
        </div>
        <div class="dev-toolbar__group">
          <div class="dev-toolbar__label">Katakana Basis</div>
          <button class="dev-toolbar__btn" @click="devAlmostMaster('katakana', 'base')">45/46 gemeistert</button>
          <button class="dev-toolbar__btn" @click="devFullMaster('katakana', 'base')">Alle gemeistert</button>
        </div>
        <div class="dev-toolbar__group">
          <div class="dev-toolbar__label">Extra Kana (Dakuten + Yōon)</div>
          <button class="dev-toolbar__btn" @click="devAlmostMaster(null, 'extra')">Bis auf eins gemeistert</button>
          <button class="dev-toolbar__btn" @click="devAlmostMaster(null, 'yoon')">Bis auf eins gemeistert</button>
          <button class="dev-toolbar__btn" @click="devFullMaster(null, 'extra')">Extras alle gemeistert</button>
        </div>
        <div class="dev-toolbar__group">
          <button class="dev-toolbar__btn dev-toolbar__btn--danger" @click="devResetAll">Reset alles</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BottomNav from './components/shared/BottomNav.vue'
import { allItems, resetProgress } from './stores/kanaStore.js'

const isDev = import.meta.env.DEV
const devOpen = ref(false)

function devAlmostMaster(script, group) {
  const targets = allItems.filter(i =>
    (script === null || i.script === script) && i.group === group
  )
  targets.slice(0, targets.length - 1).forEach(i => {
    i.streak = 2; i.weight = 0.3; i.correct = Math.max(i.correct, 2)
  })
  const last = targets[targets.length - 1]
  if (last) { last.streak = 1; last.weight = 10 }
}

function devFullMaster(script, group) {
  const targets = allItems.filter(i =>
    (script === null || i.script === script) && i.group === group
  )
  targets.forEach(i => { i.streak = 2; i.weight = 0.3; i.correct = Math.max(i.correct, 2) })
}

function devResetAll() {
  resetProgress()
}
</script>
