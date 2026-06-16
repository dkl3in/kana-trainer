import { reactive, computed, ref, watch } from 'vue'
import {
  baseHiragana, baseKatakana,
  extraHiragana, extraKatakana,
  yoonHiragana, yoonKatakana,
  makeItems
} from '../kana.js'

const STORAGE_KEY = 'kana-trainer-v2'
const PACK_SIZE = 8

// All kana items as a reactive array
export const allItems = reactive([
  ...makeItems(baseHiragana, 'hiragana', 'base'),
  ...makeItems(baseKatakana, 'katakana', 'base'),
  ...makeItems(extraHiragana, 'hiragana', 'extra'),
  ...makeItems(extraKatakana, 'katakana', 'extra'),
  ...makeItems(yoonHiragana, 'hiragana', 'yoon'),
  ...makeItems(yoonKatakana, 'katakana', 'yoon')
])

export const mode = ref('hiragana')
export const blockFocusIds = ref(null)
export const blockLabel = ref('')

// --- Level / pack system ---
const baseItems = computed(() => allItems.filter(i => i.group === 'base'))
const extraItems = computed(() => allItems.filter(i => i.group !== 'base'))

const hiraBase = computed(() => baseItems.value.filter(i => i.script === 'hiragana'))
const kataBase = computed(() => baseItems.value.filter(i => i.script === 'katakana'))

export const totalHiraBase = computed(() => hiraBase.value.length)
export const totalKataBase = computed(() => kataBase.value.length)
export const totalExtras = computed(() => extraItems.value.length)

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

export const hiraMastered = computed(() => hiraBase.value.filter(i => i.streak >= 2).length)
export const kataMastered = computed(() => kataBase.value.filter(i => i.streak >= 2).length)
export const extraMastered = computed(() => extraItems.value.filter(i => i.streak >= 2).length)
export const dakutenMastered = computed(() => allItems.filter(i => i.group === 'extra' && i.streak >= 2).length)
export const yoonMastered = computed(() => allItems.filter(i => i.group === 'yoon' && i.streak >= 2).length)

export const hiraBaseMastered = computed(() => hiraMastered.value === totalHiraBase.value)
export const kataBaseMastered = computed(() => kataMastered.value === totalKataBase.value)

const calcLevel = (packs) => {
  let level = 0
  for (const pack of packs) {
    const done = pack.every(i => i.streak >= 2)
    if (done) level++
    else break
  }
  return Math.min(level, packs.length - 1)
}

export const hiraLevel = computed(() => calcLevel(hiraPacks.value))
export const kataLevel = computed(() => calcLevel(kataPacks.value))
export const extraLevel = computed(() => calcLevel(extraPacks.value))

const hiraUnlocked = computed(() => Math.min((hiraLevel.value + 1) * PACK_SIZE, totalHiraBase.value))
const kataUnlocked = computed(() => Math.min((kataLevel.value + 1) * PACK_SIZE, totalKataBase.value))
const extrasUnlocked = computed(() => Math.min((extraLevel.value + 1) * PACK_SIZE, totalExtras.value))

export const baseMastered = computed(() =>
  hiraMastered.value === totalHiraBase.value && kataMastered.value === totalKataBase.value
)

const activeBaseHira = computed(() => hiraBase.value.slice(0, hiraUnlocked.value))
const activeBaseKata = computed(() => kataBase.value.slice(0, kataUnlocked.value))
const activeExtras = computed(() => extraItems.value.slice(0, extrasUnlocked.value))

export const activePool = computed(() => {
  if (blockFocusIds.value) {
    return allItems.filter(i => blockFocusIds.value.has(i.id))
  }
  let pool
  if (mode.value === 'hiragana') pool = activeBaseHira.value
  else if (mode.value === 'katakana') pool = activeBaseKata.value
  else pool = activeBaseHira.value.concat(activeBaseKata.value)

  if (baseMastered.value) {
    pool = pool.concat(activeExtras.value)
  }
  return pool
})

export const hiraProgress = computed(() =>
  totalHiraBase.value ? Math.round((hiraMastered.value / totalHiraBase.value) * 100) : 0
)
export const kataProgress = computed(() =>
  totalKataBase.value ? Math.round((kataMastered.value / totalKataBase.value) * 100) : 0
)
export const extraProgress = computed(() =>
  totalExtras.value ? Math.round((extraMastered.value / totalExtras.value) * 100) : 0
)

export const wrongList = computed(() =>
  allItems.filter(i => i.wrong > 0).sort((a, b) => b.wrong - a.wrong)
)

export const badges = computed(() => {
  const totalCorrect = allItems.reduce((s, i) => s + i.correct, 0)
  const totalDakuten = extraHiragana.length + extraKatakana.length
  const totalYoon = yoonHiragana.length + yoonKatakana.length
  return [
    { id: 'b1', icon: 'carbon:sprout', titleKey: 'badges.firstHit', unlocked: totalCorrect >= 1 },
    { id: 'b2', icon: 'carbon:fire', titleKey: 'badges.ten', unlocked: totalCorrect >= 10 },
    { id: 'b_s1', icon: 'carbon:flash', titleKey: 'badges.internalized', unlocked: allItems.some(i => i.correct >= 10) },
    { id: 'b3', icon: 'carbon:certificate', titleKey: 'badges.fifty', unlocked: totalCorrect >= 50 },
    { id: 'b_n1', icon: 'carbon:rocket', titleKey: 'badges.hundred', unlocked: totalCorrect >= 100 },
    { id: 'b_n2', icon: 'carbon:text-italic', titleKey: 'badges.hiramastered', unlocked: hiraMastered.value === totalHiraBase.value },
    { id: 'b_n3', icon: 'carbon:medal', titleKey: 'badges.twoHundred', unlocked: totalCorrect >= 200 },
    { id: 'b_n4', icon: 'carbon:translate', titleKey: 'badges.katamastered', unlocked: kataMastered.value === totalKataBase.value },
    { id: 'b4', icon: 'carbon:trophy', titleKey: 'badges.basemastered', unlocked: baseMastered.value },
    { id: 'b5', icon: 'carbon:star-filled', titleKey: 'badges.extrasstarted', unlocked: extraMastered.value >= 1 },
    { id: 'b_n5', icon: 'carbon:diploma', titleKey: 'badges.dakutenmastered', unlocked: dakutenMastered.value === totalDakuten },
    { id: 'b_n6', icon: 'carbon:star', titleKey: 'badges.yoonmastered', unlocked: yoonMastered.value === totalYoon },
    { id: 'b_n7', icon: 'carbon:lightning', titleKey: 'badges.streakmaster', unlocked: allItems.some(i => i.streak >= 10) }
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

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function sampleOptions(correctItem, pool, count = 8) {
  const distractorPool = blockFocusIds.value
    ? allItems.filter(i => i.id !== correctItem.id && i.script === correctItem.script && i.group === correctItem.group)
    : pool.filter(i => i.id !== correctItem.id)
  const picked = new Set()
  while (picked.size < count - 1 && distractorPool.length > picked.size) {
    const it = distractorPool[Math.floor(Math.random() * distractorPool.length)]
    picked.add(it)
  }
  return shuffle([correctItem, ...picked])
}

// --- Persistence ---
export function saveProgress() {
  const payload = {
    mode: mode.value,
    items: allItems.map(i => ({
      id: i.id, correct: i.correct, wrong: i.wrong, streak: i.streak, weight: i.weight
    }))
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

export function loadProgress() {
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
    console.warn('Could not load kana progress:', e)
  }
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
  allItems.forEach(i => { i.correct = 0; i.wrong = 0; i.streak = 0; i.weight = 1 })
}

// Auto-save on any item change or mode change
watch(allItems, saveProgress, { deep: true })
watch(mode, saveProgress, { flush: 'sync' })
