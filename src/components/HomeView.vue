<template>
  <div class="home">
    <h1 class="home__title">{{ $t('home.title') }}</h1>

    <div class="home__cards">
      <button class="home__card home__card--kana" @click="router.push('/kana/quiz')">
        <span class="home__card-icon">あ ア</span>
        <span class="home__card-label">{{ $t('home.kana.label') }}</span>
        <span class="home__card-desc">{{ $t('home.kana.desc') }}</span>
        <div class="home__card-progress">
          <div class="home__progress-bar">
            <div class="home__progress-fill home__progress-fill--kana" :style="{ width: kanaPercent + '%' }"></div>
          </div>
          <span class="home__progress-text">{{ kanaMastered }} / {{ kanaTotal }}</span>
        </div>
      </button>

      <button class="home__card home__card--kanji" @click="router.push('/kanji/quiz')">
        <span class="home__card-icon home__card-icon--kanji">漢</span>
        <span class="home__card-label">{{ $t('home.kanji.label') }}</span>
        <span class="home__card-desc">{{ $t('home.kanji.desc') }}</span>
        <div class="home__card-progress">
          <div class="home__progress-bar">
            <div class="home__progress-fill home__progress-fill--kanji" :style="{ width: kanjiPercent + '%' }"></div>
          </div>
          <span class="home__progress-text">{{ kanjiMasteredCount }} / {{ kanjiTotal }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { hiraMastered, kataMastered, extraMastered, totalHiraBase, totalKataBase, totalExtras } from '../stores/kanaStore.js'
import { meaningMastered, readingMastered, totalKanji } from '../stores/kanjiStore.js'

const router = useRouter()

const kanaMastered = computed(() => hiraMastered.value + kataMastered.value + extraMastered.value)
const kanaTotal = computed(() => totalHiraBase.value + totalKataBase.value + totalExtras.value)
const kanaPercent = computed(() => kanaTotal.value ? Math.round((kanaMastered.value / kanaTotal.value) * 100) : 0)

const kanjiMasteredCount = computed(() => meaningMastered.value + readingMastered.value)
const kanjiTotal = computed(() => totalKanji.value * 2)
const kanjiPercent = computed(() => kanjiTotal.value ? Math.round((kanjiMasteredCount.value / kanjiTotal.value) * 100) : 0)
</script>
