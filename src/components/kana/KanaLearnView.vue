<template>
  <div class="learn">
    <!-- Controls -->
    <div class="learn__controls">
      <div class="mode-tabs-wrap">
        <div class="mode-tabs">
          <button class="mode-tabs__btn" :class="{ 'mode-tabs__btn--active': script === 'hiragana' }" @click="script = 'hiragana'">あ</button>
          <button class="mode-tabs__btn" :class="{ 'mode-tabs__btn--active': script === 'katakana' }" @click="script = 'katakana'">ア</button>
        </div>
      </div>
      <div class="learn__toggle-group">
        <button
          class="learn__toggle"
          :class="{ 'learn__toggle--active': direction === 'kana-to-romaji' }"
          @click="direction = 'kana-to-romaji'"
        >Kana → Romaji</button>
        <button
          class="learn__toggle"
          :class="{ 'learn__toggle--active': direction === 'romaji-to-kana' }"
          @click="direction = 'romaji-to-kana'"
        >Romaji → Kana</button>
      </div>
    </div>

    <!-- Basis rows -->
    <div class="learn__section">
      <h3 class="learn__section-title">Basis (Gojūon)</h3>
      <div v-for="row in baseRows" :key="row.label" class="learn-row">
        <div class="learn-row__header">
          <span class="learn-row__label">{{ row.label }}</span>
          <button class="learn-row__practice-btn" @click="handlePracticeBlock(row.items, row.label)">
            Diesen Block üben
          </button>
        </div>
        <div class="learn-row__grid">
          <div
            v-for="item in row.items"
            :key="item.id"
            class="card"
            :class="{ 'card--flipped': flipped.has(item.id) }"
            @click="toggleFlip(item.id)"
          >
            <div class="card__inner">
              <div class="card__front">
                <span>{{ direction === 'kana-to-romaji' ? item.kana : item.romaji }}</span>
              </div>
              <div class="card__back">
                <span>{{ direction === 'kana-to-romaji' ? item.romaji : item.kana }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dakuten rows -->
    <div class="learn__section">
      <h3 class="learn__section-title">Dakuten &amp; Handakuten</h3>
      <div v-for="row in dakutenRows" :key="row.label" class="learn-row">
        <div class="learn-row__header">
          <span class="learn-row__label">{{ row.label }}</span>
          <button class="learn-row__practice-btn" @click="handlePracticeBlock(row.items, row.label)">
            Diesen Block üben
          </button>
        </div>
        <div class="learn-row__grid">
          <div
            v-for="item in row.items"
            :key="item.id"
            class="card"
            :class="{ 'card--flipped': flipped.has(item.id) }"
            @click="toggleFlip(item.id)"
          >
            <div class="card__inner">
              <div class="card__front">
                <span>{{ direction === 'kana-to-romaji' ? item.kana : item.romaji }}</span>
              </div>
              <div class="card__back">
                <span>{{ direction === 'kana-to-romaji' ? item.romaji : item.kana }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Yōon rows -->
    <div class="learn__section">
      <h3 class="learn__section-title">Yōon (Lautkombinationen)</h3>
      <div v-for="row in yoonRows" :key="row.label" class="learn-row">
        <div class="learn-row__header">
          <span class="learn-row__label">{{ row.label }}</span>
          <button class="learn-row__practice-btn" @click="handlePracticeBlock(row.items, row.label)">
            Diesen Block üben
          </button>
        </div>
        <div class="learn-row__grid">
          <div
            v-for="item in row.items"
            :key="item.id"
            class="card"
            :class="{ 'card--flipped': flipped.has(item.id) }"
            @click="toggleFlip(item.id)"
          >
            <div class="card__inner">
              <div class="card__front">
                <span>{{ direction === 'kana-to-romaji' ? item.kana : item.romaji }}</span>
              </div>
              <div class="card__back">
                <span>{{ direction === 'kana-to-romaji' ? item.romaji : item.kana }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { BASE_ROW_DEFS, DAKUTEN_ROW_DEFS, YOON_ROW_DEFS } from '../../kana.js'
import { allItems, loadProgress, blockFocusIds, blockLabel } from '../../stores/kanaStore.js'

const router = useRouter()

onMounted(() => loadProgress())

const props = defineProps({ allItems: { type: Array, default: () => allItems } })

function handlePracticeBlock(items, label) {
  blockFocusIds.value = new Set(items.map(i => i.id))
  blockLabel.value = label
  router.push('/kana/quiz')
}

const script = ref('hiragana')
const direction = ref('kana-to-romaji')
const flipped = ref(new Set())

function toggleFlip(id) {
  const s = new Set(flipped.value)
  if (s.has(id)) s.delete(id)
  else s.add(id)
  flipped.value = s
}

const baseHiraItems = computed(() =>
  props.allItems.filter(i => i.script === 'hiragana' && i.group === 'base')
)
const baseKataItems = computed(() =>
  props.allItems.filter(i => i.script === 'katakana' && i.group === 'base')
)
const extraHiraItems = computed(() =>
  props.allItems.filter(i => i.script === 'hiragana' && i.group === 'extra')
)
const extraKataItems = computed(() =>
  props.allItems.filter(i => i.script === 'katakana' && i.group === 'extra')
)
const yoonHiraItems = computed(() =>
  props.allItems.filter(i => i.script === 'hiragana' && i.group === 'yoon')
)
const yoonKataItems = computed(() =>
  props.allItems.filter(i => i.script === 'katakana' && i.group === 'yoon')
)

const baseRows = computed(() => {
  const items = script.value === 'hiragana' ? baseHiraItems.value : baseKataItems.value
  return BASE_ROW_DEFS.map(r => ({
    label: script.value === 'hiragana' ? r.hLabel : r.kLabel,
    items: items.slice(r.start, r.end)
  }))
})

const dakutenRows = computed(() => {
  const items = script.value === 'hiragana' ? extraHiraItems.value : extraKataItems.value
  return DAKUTEN_ROW_DEFS.map(r => ({
    label: script.value === 'hiragana' ? r.hLabel : r.kLabel,
    items: items.slice(r.start, r.end)
  }))
})

const yoonRows = computed(() => {
  const items = script.value === 'hiragana' ? yoonHiraItems.value : yoonKataItems.value
  return YOON_ROW_DEFS.map(r => ({
    label: script.value === 'hiragana' ? r.hLabel : r.kLabel,
    items: items.slice(r.start, r.end)
  }))
})
</script>
