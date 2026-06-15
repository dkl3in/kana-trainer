<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">Kana Trainer</h1>
    </header>

    <!-- QUIZ -->
    <main class="quiz" v-if="view === 'quiz'">
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

    <!-- STATS -->
    <section class="stats" v-if="view === 'stats'">
      <h2 class="stats__title">Statistik</h2>
      <p class="stats__subtitle">Zeichen mit Fehlern (absteigend)</p>

      <div class="stats__scroll">
        <div class="stats__table">
          <div class="stats__row stats__row--head">
            <div>Zeichen</div>
            <div>Romaji</div>
            <div>Script</div>
            <div>Falsch</div>
            <div>Richtig</div>
            <div>Streak</div>
          </div>

          <div v-for="item in wrongList" :key="item.id" class="stats__row">
            <div class="stats__kana">{{ item.kana }}</div>
            <div>{{ item.romaji }}</div>
            <div>{{ item.script }}</div>
            <div>{{ item.wrong }}</div>
            <div>{{ item.correct }}</div>
            <div>{{ item.streak }}</div>
          </div>

          <div v-if="wrongList.length === 0" class="stats__empty">
            Noch keine Fehler 🎉
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs, Modus, Fortschritt -->
    <div class="app__controls-panel">
      <!-- Tabs -->
      <div class="tabs">
        <button
          class="tabs__btn"
          :class="{ 'tabs__btn--active': view === 'quiz' }"
          @click="view = 'quiz'"
        >
          Quiz
        </button>
        <button
          class="tabs__btn"
          :class="{ 'tabs__btn--active': view === 'stats' }"
          @click="view = 'stats'"
        >
          Statistik
        </button>
      </div>

      <div class="app__controls" v-if="view === 'quiz'">
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

      <div class="progress" v-if="view === 'quiz'">
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

      <div class="badges" v-if="view === 'quiz'">
        <div class="badges__title">Badges</div>
        <div class="badges__list">
          <span v-for="b in badges" :key="b.id" class="badges__item" :class="b.unlocked && 'badges__item--on'">
            {{ b.icon }} {{ b.title }}
          </span>
        </div>
      </div>

      <div class="app__actions" v-if="view === 'quiz'">
        <button class="app__reset" @click="resetProgress">Fortschritt zurücksetzen</button>
      </div>
    </div>

    <footer class="app__footer">
      <small>Freischaltung: jedes Paket (8) benötigt 2× richtige Streak pro Zeichen</small>
    </footer>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch, onMounted, onBeforeUnmount } from 'vue'

/** -----------------------------
 * View (Tabs)
 * ---------------------------- */
const view = ref('quiz')

/** -----------------------------
 * Datenbasis (Gojūon + Extras)
 * ---------------------------- */
const baseHiragana = [
  ['あ','a'], ['い','i'], ['う','u'], ['え','e'], ['お','o'],
  ['か','ka'], ['き','ki'], ['く','ku'], ['け','ke'], ['こ','ko'],
  ['さ','sa'], ['し','shi'], ['す','su'], ['せ','se'], ['そ','so'],
  ['た','ta'], ['ち','chi'], ['つ','tsu'], ['て','te'], ['と','to'],
  ['な','na'], ['に','ni'], ['ぬ','nu'], ['ね','ne'], ['の','no'],
  ['は','ha'], ['ひ','hi'], ['ふ','fu'], ['へ','he'], ['ほ','ho'],
  ['ま','ma'], ['み','mi'], ['む','mu'], ['め','me'], ['も','mo'],
  ['や','ya'], ['ゆ','yu'], ['よ','yo'],
  ['ら','ra'], ['り','ri'], ['る','ru'], ['れ','re'], ['ろ','ro'],
  ['わ','wa'], ['を','wo'],
  ['ん','n']
]

const baseKatakana = [
  ['ア','a'], ['イ','i'], ['ウ','u'], ['エ','e'], ['オ','o'],
  ['カ','ka'], ['キ','ki'], ['ク','ku'], ['ケ','ke'], ['コ','ko'],
  ['サ','sa'], ['シ','shi'], ['ス','su'], ['セ','se'], ['ソ','so'],
  ['タ','ta'], ['チ','chi'], ['ツ','tsu'], ['テ','te'], ['ト','to'],
  ['ナ','na'], ['ニ','ni'], ['ヌ','nu'], ['ネ','ne'], ['ノ','no'],
  ['ハ','ha'], ['ヒ','hi'], ['フ','fu'], ['ヘ','he'], ['ホ','ho'],
  ['マ','ma'], ['ミ','mi'], ['ム','mu'], ['メ','me'], ['モ','mo'],
  ['ヤ','ya'], ['ユ','yu'], ['ヨ','yo'],
  ['ラ','ra'], ['リ','ri'], ['ル','ru'], ['レ','re'], ['ロ','ro'],
  ['ワ','wa'], ['ヲ','wo'],
  ['ン','n']
]

const extraHiragana = [
  ['が','ga'], ['ぎ','gi'], ['ぐ','gu'], ['げ','ge'], ['ご','go'],
  ['ざ','za'], ['じ','ji'], ['ず','zu'], ['ぜ','ze'], ['ぞ','zo'],
  ['だ','da'], ['ぢ','ji'], ['づ','zu'], ['で','de'], ['ど','do'],
  ['ば','ba'], ['び','bi'], ['ぶ','bu'], ['べ','be'], ['ぼ','bo'],
  ['ぱ','pa'], ['ぴ','pi'], ['ぷ','pu'], ['ぺ','pe'], ['ぽ','po']
]

const extraKatakana = [
  ['ガ','ga'], ['ギ','gi'], ['グ','gu'], ['ゲ','ge'], ['ゴ','go'],
  ['ザ','za'], ['ジ','ji'], ['ズ','zu'], ['ゼ','ze'], ['ゾ','zo'],
  ['ダ','da'], ['ヂ','ji'], ['ヅ','zu'], ['デ','de'], ['ド','do'],
  ['バ','ba'], ['ビ','bi'], ['ブ','bu'], ['ベ','be'], ['ボ','bo'],
  ['パ','pa'], ['ピ','pi'], ['プ','pu'], ['ペ','pe'], ['ポ','po']
]

const yoonHiragana = [
  ['きゃ','kya'], ['きゅ','kyu'], ['きょ','kyo'],
  ['ぎゃ','gya'], ['ぎゅ','gyu'], ['ぎょ','gyo'],
  ['しゃ','sha'], ['しゅ','shu'], ['しょ','sho'],
  ['じゃ','ja'], ['じゅ','ju'], ['じょ','jo'],
  ['ちゃ','cha'], ['ちゅ','chu'], ['ちょ','cho'],
  ['にゃ','nya'], ['にゅ','nyu'], ['にょ','nyo'],
  ['ひゃ','hya'], ['ひゅ','hyu'], ['ひょ','hyo'],
  ['びゃ','bya'], ['びゅ','byu'], ['びょ','byo'],
  ['ぴゃ','pya'], ['ぴゅ','pyu'], ['ぴょ','pyo'],
  ['みゃ','mya'], ['みゅ','myu'], ['みょ','myo'],
  ['りゃ','rya'], ['りゅ','ryu'], ['りょ','ryo']
]

const yoonKatakana = [
  ['キャ','kya'], ['キュ','kyu'], ['キョ','kyo'],
  ['ギャ','gya'], ['ギュ','gyu'], ['ギョ','gyo'],
  ['シャ','sha'], ['シュ','shu'], ['ショ','sho'],
  ['ジャ','ja'], ['ジュ','ju'], ['ジョ','jo'],
  ['チャ','cha'], ['チュ','chu'], ['チョ','cho'],
  ['ニャ','nya'], ['ニュ','nyu'], ['ニョ','nyo'],
  ['ヒャ','hya'], ['ヒュ','hyu'], ['ヒョ','hyo'],
  ['ビャ','bya'], ['ビュ','byu'], ['ビョ','byo'],
  ['ピャ','pya'], ['ピュ','pyu'], ['ピョ','pyo'],
  ['ミャ','mya'], ['ミュ','myu'], ['ミョ','myo'],
  ['リャ','rya'], ['リュ','ryu'], ['リョ','ryo']
]

const makeItems = (arr, script, group) =>
  arr.map(([kana, romaji], idx) => ({
    id: `${script}-${group}-${idx}-${kana}`,
    kana, romaji, script, group,
    correct: 0, wrong: 0, streak: 0, weight: 1
  }))

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
    { id: 'b1', icon: '🌱', title: 'Erster Treffer', unlocked: totalCorrect >= 1 },
    { id: 'b2', icon: '🔥', title: '10 richtig', unlocked: totalCorrect >= 10 },
    { id: 'b3', icon: '💯', title: '50 richtig', unlocked: totalCorrect >= 50 },
    { id: 'b4', icon: '🏁', title: 'Basis gemeistert', unlocked: baseMastered.value },
    { id: 'b5', icon: '✨', title: 'Extras gestartet', unlocked: extraMastered.value >= 1 }
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
  const pool = activePool.value.filter(i => i.id !== correctItem.id)
  const picked = new Set()
  while (picked.size < count - 1 && pool.length) {
    const it = pool[Math.floor(Math.random() * pool.length)]
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
