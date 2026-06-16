<template>
  <div class="overview">
    <div v-for="cat in categories" :key="cat.label">
      <h3 class="overview__section-title">{{ cat.label }}</h3>
      <div class="overview-grid">
        <div
          v-for="item in cat.items"
          :key="item.kanji"
          class="overview-mini-cell overview-cell--clickable overview-mini-cell--kanji"
          @click="openZoom(item)"
        >
          <span class="overview-cell__kana overview-cell__kana--kanji">{{ item.kanji }}</span>
          <span class="overview-cell__romaji">{{ item.allMeanings[0] }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Zoom Modal -->
  <Teleport to="body">
    <div
      v-if="selectedItem"
      class="zoom-overlay"
      @click="onOverlayClick"
      @touchstart.passive="onTouchStart"
      @touchend="onTouchEnd"
    >
      <button class="zoom-close" @click.stop="closeZoom" :aria-label="$t('overview.close')">✕</button>
      <div class="zoom-card zoom-card--kanji">
        <span class="zoom-card__kana">{{ selectedItem.kanji }}</span>
        <div class="zoom-kanji-details">
          <div v-if="selectedItem.onyomi.length" class="zoom-kanji-row">
            <span class="zoom-kanji-label">{{ $t('overview.onyomi') }}:</span>
            <span class="zoom-kanji-value">{{ selectedItem.onyomi.join('、') }}</span>
          </div>
          <div v-if="selectedItem.kunyomi.length" class="zoom-kanji-row">
            <span class="zoom-kanji-label">{{ $t('overview.kunyomi') }}:</span>
            <span class="zoom-kanji-value">{{ selectedItem.kunyomi.join('、') }}</span>
          </div>
          <div class="zoom-kanji-row">
            <span class="zoom-kanji-label">{{ $t('overview.meaning') }}:</span>
            <span class="zoom-kanji-value">{{ selectedItem.allMeanings.join(', ') }}</span>
          </div>
          <div v-if="selectedItem.example" class="zoom-kanji-row zoom-kanji-row--example">
            <span class="zoom-kanji-label">{{ $t('overview.example') }}:</span>
            <span class="zoom-kanji-value">
              {{ selectedItem.example.word }}
              <span class="zoom-kanji-reading">（{{ selectedItem.example.reading }}）</span>
              — {{ selectedItem.example.meaning }}
            </span>
          </div>
        </div>
      </div>
      <p class="zoom-hint">{{ $t('overview.swipeHint') }}</p>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { n5Kanji, KANJI_CATEGORY_DEFS } from '../../kanji.js'
import { meaningItems, loadProgress } from '../../stores/kanjiStore.js'

onMounted(() => loadProgress())

const categories = computed(() =>
  KANJI_CATEGORY_DEFS.map(cat => ({
    label: cat.label,
    items: meaningItems.slice(cat.start, cat.end)
  }))
)

const allFlat = computed(() => meaningItems)

const selectedIndex = ref(-1)
const selectedItem = computed(() =>
  selectedIndex.value >= 0 ? allFlat.value[selectedIndex.value] : null
)

let touchStartX = 0
let swipeHandled = false

function openZoom(item) {
  selectedIndex.value = allFlat.value.findIndex(i => i.kanji === item.kanji)
}

function closeZoom() { selectedIndex.value = -1 }

function navigate(delta) {
  const len = allFlat.value.length
  selectedIndex.value = (selectedIndex.value + delta + len) % len
}

function onOverlayClick() {
  if (!swipeHandled) closeZoom()
  swipeHandled = false
}

function onTouchStart(e) { touchStartX = e.touches[0].clientX; swipeHandled = false }

function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) > 50) { navigate(dx < 0 ? 1 : -1); swipeHandled = true; e.preventDefault() }
}

function onKeyDown(e) {
  if (!selectedItem.value) return
  if (e.key === 'Escape') closeZoom()
  if (e.key === 'ArrowRight') navigate(1)
  if (e.key === 'ArrowLeft') navigate(-1)
}

onMounted(() => document.addEventListener('keydown', onKeyDown))
onUnmounted(() => document.removeEventListener('keydown', onKeyDown))
</script>
