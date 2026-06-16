import { reactive, computed, ref, watch } from 'vue'
import { n5Kanji, makeKanjiItems } from '../kanji.js'

const STORAGE_KEY = 'kana-trainer-kanji-v1'
const PACK_SIZE = 8

const { meaningItems: _meaning, readingItems: _reading } = makeKanjiItems(n5Kanji)

export const meaningItems = reactive(_meaning)
export const readingItems = reactive(_reading)

export const quizMode = ref('meaning')
export const blockFocusIds = ref(null)
export const blockLabel = ref('')

// --- Pack system ---
const makePacks = (list) => {
  const result = []
  for (let i = 0; i < list.length; i += PACK_SIZE) result.push(list.slice(i, i + PACK_SIZE))
  return result
}

const meaningPacks = computed(() => makePacks(meaningItems))
const readingPacks = computed(() => makePacks(readingItems))

const calcLevel = (packs) => {
  let level = 0
  for (const pack of packs) {
    if (pack.every(i => i.streak >= 2)) level++
    else break
  }
  return Math.min(level, packs.length - 1)
}

export const meaningLevel = computed(() => calcLevel(meaningPacks.value))
export const readingLevel = computed(() => calcLevel(readingPacks.value))

const meaningUnlocked = computed(() => Math.min((meaningLevel.value + 1) * PACK_SIZE, meaningItems.length))
const readingUnlocked = computed(() => Math.min((readingLevel.value + 1) * PACK_SIZE, readingItems.length))

export const activeMeaningPool = computed(() => {
  if (blockFocusIds.value) return meaningItems.filter(i => blockFocusIds.value.has(i.id))
  return meaningItems.slice(0, meaningUnlocked.value)
})

export const activeReadingPool = computed(() => {
  if (blockFocusIds.value) return readingItems.filter(i => blockFocusIds.value.has(i.id))
  return readingItems.slice(0, readingUnlocked.value)
})

export const activePool = computed(() =>
  quizMode.value === 'meaning' ? activeMeaningPool.value : activeReadingPool.value
)

// --- Progress ---
export const meaningMastered = computed(() => meaningItems.filter(i => i.streak >= 2).length)
export const readingMastered = computed(() => readingItems.filter(i => i.streak >= 2).length)
export const totalKanji = computed(() => meaningItems.length)

export const meaningProgress = computed(() =>
  totalKanji.value ? Math.round((meaningMastered.value / totalKanji.value) * 100) : 0
)
export const readingProgress = computed(() =>
  totalKanji.value ? Math.round((readingMastered.value / totalKanji.value) * 100) : 0
)

export const allMastered = computed(() =>
  meaningMastered.value === totalKanji.value && readingMastered.value === totalKanji.value
)

export const wrongList = computed(() => {
  const all = [...meaningItems, ...readingItems]
  return all.filter(i => i.wrong > 0).sort((a, b) => b.wrong - a.wrong)
})

export const badges = computed(() => {
  const allItems = [...meaningItems, ...readingItems]
  const totalCorrect = allItems.reduce((s, i) => s + i.correct, 0)
  return [
    { id: 'k1', icon: 'carbon:sprout', titleKey: 'badges.kanjiFirst', unlocked: totalCorrect >= 1 },
    { id: 'k2', icon: 'carbon:fire', titleKey: 'badges.kanjiTen', unlocked: totalCorrect >= 10 },
    { id: 'k3', icon: 'carbon:flash', titleKey: 'badges.kanjiInternalized', unlocked: allItems.some(i => i.correct >= 10) },
    { id: 'k4', icon: 'carbon:document', titleKey: 'badges.kanji25', unlocked: (meaningMastered.value + readingMastered.value) >= 25 },
    { id: 'k5', icon: 'carbon:translate', titleKey: 'badges.kanjiMeaning', unlocked: meaningMastered.value === totalKanji.value },
    { id: 'k6', icon: 'carbon:text-italic', titleKey: 'badges.kanjiReading', unlocked: readingMastered.value === totalKanji.value },
    { id: 'k7', icon: 'carbon:trophy', titleKey: 'badges.kanjiComplete', unlocked: allMastered.value },
    { id: 'k8', icon: 'carbon:lightning', titleKey: 'badges.kanjiStreak', unlocked: allItems.some(i => i.streak >= 10) }
  ]
})

// --- Quiz helpers ---
export function weightedPick(pool) {
  const total = pool.reduce((s, i) => s + i.weight, 0)
  let r = Math.random() * total
  for (const item of pool) {
    r -= item.weight
    if (r <= 0) return item
  }
  return pool[pool.length - 1]
}

export function sampleOptions(correctItem, pool, count = 8) {
  const allOfType = quizMode.value === 'meaning' ? meaningItems : readingItems
  const distractorPool = blockFocusIds.value
    ? allOfType.filter(i => i.id !== correctItem.id)
    : pool.filter(i => i.id !== correctItem.id)
  const picked = new Set()
  while (picked.size < count - 1 && distractorPool.length > picked.size) {
    const it = distractorPool[Math.floor(Math.random() * distractorPool.length)]
    picked.add(it)
  }
  return [correctItem, ...picked].sort(() => Math.random() - 0.5)
}

// --- Persistence ---
export function saveProgress() {
  const payload = {
    quizMode: quizMode.value,
    meaningItems: meaningItems.map(i => ({ id: i.id, correct: i.correct, wrong: i.wrong, streak: i.streak, weight: i.weight })),
    readingItems: readingItems.map(i => ({ id: i.id, correct: i.correct, wrong: i.wrong, streak: i.streak, weight: i.weight }))
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function loadProgress() {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return
  try {
    const data = JSON.parse(raw)
    if (data.quizMode) quizMode.value = data.quizMode
    const restore = (items, saved) => {
      if (!Array.isArray(saved)) return
      const map = new Map(saved.map(i => [i.id, i]))
      items.forEach(i => {
        const s = map.get(i.id)
        if (s) { i.correct = s.correct ?? 0; i.wrong = s.wrong ?? 0; i.streak = s.streak ?? 0; i.weight = s.weight ?? 1 }
      })
    }
    restore(meaningItems, data.meaningItems)
    restore(readingItems, data.readingItems)
  } catch (e) {
    console.warn('Could not load kanji progress:', e)
  }
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
  const reset = (arr) => arr.forEach(i => { i.correct = 0; i.wrong = 0; i.streak = 0; i.weight = 1 })
  reset(meaningItems)
  reset(readingItems)
}

watch(meaningItems, saveProgress, { deep: true })
watch(readingItems, saveProgress, { deep: true })
watch(quizMode, saveProgress, { flush: 'sync' })
