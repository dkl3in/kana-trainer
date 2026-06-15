<template>
  <div class="app">
    <!-- QUIZ -->
    <template v-if="view === 'quiz'">
      <main class="quiz">
        <div class="block-mode-banner" v-if="blockFocusIds">
          <span class="block-mode-banner__label">Block-Modus: {{ blockLabel }}</span>
          <button class="block-mode-banner__exit" @click="clearBlockMode">× Zum vollen Quiz</button>
        </div>
        <div class="quiz__prompt">
          <div class="quiz__kana">{{ current?.kana }}</div>
        </div>

        <div class="quiz__options">
          <button
            v-for="opt in options"
            :key="opt.id"
            class="quiz__option"
            :disabled="answered"
            @click="submit(opt)"
          >
            {{ opt.romaji }}
          </button>
        </div>

        <div class="quiz__feedback" v-if="answered">
          <p
            class="quiz__message"
            :class="{
              'quiz__message--correct': isCorrect,
              'quiz__message--wrong': !isCorrect
            }"
          >
            {{ isCorrect ? 'Richtig!' : `Falsch – richtig ist: ${current.romaji}` }}
          </p>

          <p class="quiz__countdown">
            Weiter in <span class="quiz__countdown-num">{{ countdown }}</span>s
          </p>

          <button class="quiz__next-link" @click="next">Nächstes Zeichen</button>
        </div>
      </main>

      <div class="quiz__settings">
        <div class="app__controls">
          <label class="app__control">
            Modus:
            <select v-model="mode" class="app__select">
              <option value="hiragana">Hiragana</option>
              <option value="katakana">Katakana</option>
              <option value="mixed">Gemischt</option>
            </select>
          </label>

          <div class="app__status">
            <span>Hira-Level: {{ hiraLevel + 1 }}</span>
            <span>Kata-Level: {{ kataLevel + 1 }}</span>
            <span>Extras-Level: {{ extraLevel + 1 }}</span>
            <span>Basis gemeistert: {{ baseMastered ? 'Ja' : 'Nein' }}</span>
          </div>
        </div>

        <div class="progress">
          <div class="progress__block">
            <div class="progress__label">Hiragana (Basis)</div>
            <div class="progress__bar">
              <div class="progress__fill" :style="{ width: hiraProgress + '%' }"></div>
            </div>
            <div class="progress__text">{{ hiraMastered }} / {{ totalHiraBase }} gemeistert</div>
          </div>

          <div class="progress__block">
            <div class="progress__label">Katakana (Basis)</div>
            <div class="progress__bar">
              <div class="progress__fill progress__fill--accent" :style="{ width: kataProgress + '%' }"></div>
            </div>
            <div class="progress__text">{{ kataMastered }} / {{ totalKataBase }} gemeistert</div>
          </div>

          <div class="progress__block">
            <div class="progress__label">Extras (Dakuten + Yōon)</div>
            <div class="progress__bar">
              <div class="progress__fill progress__fill--gold" :style="{ width: extraProgress + '%' }"></div>
            </div>
            <div class="progress__text">{{ extraMastered }} / {{ totalExtras }} gemeistert</div>
          </div>
        </div>

        <div class="badges">
          <div class="badges__title">Badges</div>
          <div class="badges__list">
            <span v-for="b in badges" :key="b.id" class="badges__item" :class="b.unlocked && 'badges__item--on'">
              <Icon :icon="b.icon" class="badges__icon" /> {{ b.title }}
            </span>
          </div>
        </div>

        <div class="app__actions">
          <button class="app__reset" @click="resetProgress">Fortschritt zurücksetzen</button>
        </div>
      </div>
    </template>

    <!-- STATS -->
    <section class="stats" v-if="view === 'stats'">
      <h2 class="stats__title">Statistik</h2>
      <p class="stats__subtitle">Zeichen mit Fehlern (absteigend)</p>

      <div class="stats__list">
        <div v-for="item in wrongList" :key="item.id" class="stats__card">
          <div class="stats__card-left">
            <span class="stats__kana">{{ item.kana }}</span>
            <span class="stats__romaji">{{ item.romaji }}</span>
          </div>
          <span class="stats__script-tag">{{ item.script === 'hiragana' ? 'Hira' : 'Kata' }}</span>
          <div class="stats__card-right">
            <span class="stats__pill stats__pill--wrong">
              <Icon icon="carbon:close-filled" />{{ item.wrong }}
            </span>
            <span class="stats__pill stats__pill--correct">
              <Icon icon="carbon:checkmark-filled" />{{ item.correct }}
            </span>
            <span class="stats__pill stats__pill--streak">
              <Icon icon="carbon:flash" />{{ item.streak }}
            </span>
          </div>
        </div>

        <div v-if="wrongList.length === 0" class="stats__empty">
          <Icon icon="carbon:checkmark-outline" class="stats__empty-icon" /> Noch keine Fehler
        </div>
      </div>
    </section>

    <!-- LERNEN -->
    <section class="learn-view" v-if="view === 'learn'">
      <LearnView :allItems="allItems" @practiceBlock="handlePracticeBlock" />
    </section>

    <!-- ÜBERSICHT -->
    <section v-if="view === 'overview'">
      <OverviewView />
    </section>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <button class="bottom-nav__btn" :class="{ 'bottom-nav__btn--active': view === 'quiz' }" @click="view = 'quiz'" aria-label="Quiz">
        <Icon icon="carbon:flash" />
      </button>
      <button class="bottom-nav__btn" :class="{ 'bottom-nav__btn--active': view === 'learn' }" @click="view = 'learn'" aria-label="Lernen">
        <Icon icon="carbon:education" />
      </button>
      <button class="bottom-nav__btn" :class="{ 'bottom-nav__btn--active': view === 'overview' }" @click="view = 'overview'" aria-label="Übersicht">
        <Icon icon="carbon:table" />
      </button>
      <button class="bottom-nav__btn" :class="{ 'bottom-nav__btn--active': view === 'stats' }" @click="view = 'stats'" aria-label="Statistik">
        <Icon icon="carbon:analytics" />
      </button>
    </nav>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import LearnView from './components/LearnView.vue'
import OverviewView from './components/OverviewView.vue'
import {
  baseHiragana, baseKatakana,
  extraHiragana, extraKatakana,
  yoonHiragana, yoonKatakana,
  makeItems
} from './kana.js'

/** -----------------------------
 * View (Tabs)
 * ---------------------------- */
const view = ref('quiz')
const blockFocusIds = ref(null)
const blockLabel = ref('')



const allItems = reactive([
  ...makeItems(baseHiragana, 'hiragana', 'base'),
  ...makeItems(baseKatakana, 'katakana', 'base'),
  ...makeItems(extraHiragana, 'hiragana', 'extra'),
  ...makeItems(extraKatakana, 'katakana', 'extra'),
  ...makeItems(yoonHiragana, 'hiragana', 'yoon'),
  ...makeItems(yoonKatakana, 'katakana', 'yoon')
])

/** -----------------------------
 * State
 * ---------------------------- */
const mode = ref('hiragana')
const answered = ref(false)
const isCorrect = ref(false)
const current = ref(null)
const options = ref([])

/** -----------------------------
 * Freischaltung (8er-Pakete)
 * ---------------------------- */
const PACK_SIZE = 8
const baseItems = computed(() => allItems.filter(i => i.group === 'base'))
const extraItems = computed(() => allItems.filter(i => i.group !== 'base'))

const hiraBase = computed(() => baseItems.value.filter(i => i.script === 'hiragana'))
const kataBase = computed(() => baseItems.value.filter(i => i.script === 'katakana'))

const totalHiraBase = computed(() => hiraBase.value.length)
const totalKataBase = computed(() => kataBase.value.length)
const totalExtras = computed(() => extraItems.value.length)

const makePacks = (list) => {
  const result = []
  for (let i = 0; i < list.length; i += PACK_SIZE) {
    result.push(list.slice(i, i + PACK_SIZE))
  }
  return result
}

const hiraPacks = computed(() => makePacks(hiraBase.value))
const kataPacks = computed(() => makePacks(kataBase.value))
const extraPacks = computed(() => makePacks(extraItems.value))

const hiraMastered = computed(() => hiraBase.value.filter(i => i.streak >= 2).length)
const kataMastered = computed(() => kataBase.value.filter(i => i.streak >= 2).length)
const extraMastered = computed(() => extraItems.value.filter(i => i.streak >= 2).length)

const calcLevel = (packs) => {
  let level = 0
  for (const pack of packs) {
    const done = pack.every(i => i.streak >= 2)
    if (done) level++
    else break
  }
  return Math.min(level, packs.length - 1)
}

const hiraLevel = computed(() => calcLevel(hiraPacks.value))
const kataLevel = computed(() => calcLevel(kataPacks.value))
const extraLevel = computed(() => calcLevel(extraPacks.value))

const hiraUnlocked = computed(() => Math.min((hiraLevel.value + 1) * PACK_SIZE, totalHiraBase.value))
const kataUnlocked = computed(() => Math.min((kataLevel.value + 1) * PACK_SIZE, totalKataBase.value))
const extrasUnlocked = computed(() => Math.min((extraLevel.value + 1) * PACK_SIZE, totalExtras.value))

const baseMastered = computed(() =>
  hiraMastered.value === totalHiraBase.value && kataMastered.value === totalKataBase.value
)

/** -----------------------------
 * Pools & Progress
 * ---------------------------- */
const activeBaseHira = computed(() => hiraBase.value.slice(0, hiraUnlocked.value))
const activeBaseKata = computed(() => kataBase.value.slice(0, kataUnlocked.value))
const activeExtras = computed(() => extraItems.value.slice(0, extrasUnlocked.value))

const activePool = computed(() => {
  if (blockFocusIds.value) {
    return allItems.filter(i => blockFocusIds.value.has(i.id))
  }
  let pool = []
  if (mode.value === 'hiragana') pool = activeBaseHira.value
  else if (mode.value === 'katakana') pool = activeBaseKata.value
  else pool = activeBaseHira.value.concat(activeBaseKata.value)

  if (baseMastered.value) {
    pool = pool.concat(activeExtras.value)
  }
  return pool
})

const hiraProgress = computed(() =>
  totalHiraBase.value ? Math.round((hiraMastered.value / totalHiraBase.value) * 100) : 0
)
const kataProgress = computed(() =>
  totalKataBase.value ? Math.round((kataMastered.value / totalKataBase.value) * 100) : 0
)
const extraProgress = computed(() =>
  totalExtras.value ? Math.round((extraMastered.value / totalExtras.value) * 100) : 0
)

/** -----------------------------
 * Badges / Erfolge
 * ---------------------------- */
const badges = computed(() => {
  const totalCorrect = allItems.reduce((s, i) => s + i.correct, 0)
  return [
    { id: 'b1', icon: 'carbon:sprout', title: 'Erster Treffer', unlocked: totalCorrect >= 1 },
    { id: 'b2', icon: 'carbon:fire', title: '10 richtig', unlocked: totalCorrect >= 10 },
    { id: 'b3', icon: 'carbon:certificate', title: '50 richtig', unlocked: totalCorrect >= 50 },
    { id: 'b4', icon: 'carbon:trophy', title: 'Basis gemeistert', unlocked: baseMastered.value },
    { id: 'b5', icon: 'carbon:star-filled', title: 'Extras gestartet', unlocked: extraMastered.value >= 1 }
  ]
})

/** -----------------------------
 * Statistik
 * ---------------------------- */
const wrongList = computed(() =>
  allItems
    .filter(i => i.wrong > 0)
    .sort((a, b) => b.wrong - a.wrong)
)

/** -----------------------------
 * Quiz Logic
 * ---------------------------- */
function weightedPick(pool) {
  const total = pool.reduce((s, i) => s + i.weight, 0)
  let r = Math.random() * total
  for (const item of pool) {
    r -= item.weight
    if (r <= 0) return item
  }
  return pool[pool.length - 1]
}

function sampleOptions(correctItem, count = 8) {
  // In block mode use the full script as distractor pool so we always get 8 options
  const distractorPool = blockFocusIds.value
    ? allItems.filter(i => i.id !== correctItem.id && i.script === correctItem.script)
    : activePool.value.filter(i => i.id !== correctItem.id)
  const picked = new Set()
  while (picked.size < count - 1 && distractorPool.length > picked.size) {
    const it = distractorPool[Math.floor(Math.random() * distractorPool.length)]
    picked.add(it)
  }
  const arr = [correctItem, ...picked]
  return arr.sort(() => Math.random() - 0.5)
}

const autoNextTimer = ref(null)
const countdownTimer = ref(null)
const countdown = ref(0)

function clearTimers() {
  if (autoNextTimer.value) {
    clearTimeout(autoNextTimer.value)
    autoNextTimer.value = null
  }
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
    countdownTimer.value = null
  }
  countdown.value = 0
}

function startCountdown(seconds) {
  clearTimers()
  countdown.value = seconds
  countdownTimer.value = setInterval(() => {
    countdown.value = Math.max(0, countdown.value - 1)
  }, 1000)

  autoNextTimer.value = setTimeout(() => {
    next()
  }, seconds * 1000)
}

function next() {
  clearTimers()
  answered.value = false
  isCorrect.value = false
  current.value = weightedPick(activePool.value)
  options.value = sampleOptions(current.value, 8)
}

function submit(opt) {
  if (answered.value) return
  const correct = opt.id === current.value.id
  isCorrect.value = correct
  answered.value = true

  if (correct) {
    current.value.correct++
    current.value.streak++
    current.value.weight = Math.max(0.3, current.value.weight * 0.7)
    startCountdown(2)
  } else {
    current.value.wrong++
    current.value.streak = 0
    current.value.weight = Math.min(10, current.value.weight * 2)
    startCountdown(3)
  }
}

/** -----------------------------
 * Block-Modus (aus Lernen-Tab)
 * ---------------------------- */
function handlePracticeBlock(items, label) {
  blockFocusIds.value = new Set(items.map(i => i.id))
  blockLabel.value = label
  view.value = 'quiz'
  next()
}

function clearBlockMode() {
  blockFocusIds.value = null
  blockLabel.value = ''
  next()
}

/** -----------------------------
 * Persistenz
 * ---------------------------- */
const STORAGE_KEY = 'kana-trainer-v2'

function saveProgress() {
  const payload = {
    mode: mode.value,
    items: allItems.map(i => ({
      id: i.id,
      correct: i.correct,
      wrong: i.wrong,
      streak: i.streak,
      weight: i.weight
    }))
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return
  try {
    const data = JSON.parse(raw)
    if (data.mode) mode.value = data.mode
    if (Array.isArray(data.items)) {
      const map = new Map(data.items.map(i => [i.id, i]))
      allItems.forEach(i => {
        const saved = map.get(i.id)
        if (saved) {
          i.correct = saved.correct ?? 0
          i.wrong = saved.wrong ?? 0
          i.streak = saved.streak ?? 0
          i.weight = saved.weight ?? 1
        }
      })
    }
  } catch (e) {
    console.warn('Konnte Speicher nicht laden:', e)
  }
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
  allItems.forEach(i => {
    i.correct = 0
    i.wrong = 0
    i.streak = 0
    i.weight = 1
  })
  next()
}

watch(allItems, saveProgress, { deep: true })
watch(mode, () => {
  saveProgress()
  next() // sofort neue Frage beim Mode-Wechsel
}, { flush: 'sync' })

onMounted(() => {
  loadProgress()
  next()
})

onBeforeUnmount(() => {
  clearTimers()
})
</script>
