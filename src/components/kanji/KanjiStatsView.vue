<template>
  <section class="stats">
    <h2 class="stats__title">{{ $t('stats.title') }} — Kanji N5</h2>

    <div class="progress">
      <div class="progress__block">
        <div class="progress__label">{{ $t('stats.progress.meaning') }}</div>
        <div class="progress__bar">
          <div class="progress__fill progress__fill--kanji" :style="{ width: meaningProgress + '%' }"></div>
        </div>
        <div class="progress__text">{{ $t('stats.progress.mastered', { done: meaningMastered, total: totalKanji }) }}</div>
      </div>
      <div class="progress__block">
        <div class="progress__label">{{ $t('stats.progress.reading') }}</div>
        <div class="progress__bar">
          <div class="progress__fill progress__fill--kanji" :style="{ width: readingProgress + '%' }"></div>
        </div>
        <div class="progress__text">{{ $t('stats.progress.mastered', { done: readingMastered, total: totalKanji }) }}</div>
      </div>
    </div>

    <p class="stats__subtitle">{{ $t('stats.wrongList') }}</p>

    <div class="stats__list">
      <div v-for="item in wrongList" :key="item.id" class="stats__card">
        <div class="stats__card-left">
          <span class="stats__kana stats__kana--kanji">{{ item.kanji }}</span>
          <span class="stats__romaji">{{ item.allMeanings[0] }}</span>
        </div>
        <span class="stats__script-tag">{{ item.type === 'meaning' ? $t('kanji.quiz.mode.meaning') : $t('kanji.quiz.mode.reading') }}</span>
        <div class="stats__card-right">
          <span class="stats__pill stats__pill--wrong"><Icon icon="carbon:close-filled" />{{ item.wrong }}</span>
          <span class="stats__pill stats__pill--correct"><Icon icon="carbon:checkmark-filled" />{{ item.correct }}</span>
          <span class="stats__pill stats__pill--streak"><Icon icon="carbon:flash" />{{ item.streak }}</span>
        </div>
      </div>
      <div v-if="wrongList.length === 0" class="stats__empty">
        <Icon icon="carbon:checkmark-outline" class="stats__empty-icon" /> {{ $t('stats.empty') }}
      </div>
    </div>

    <div class="badges">
      <div class="badges__title">{{ $t('stats.badges.title') }}</div>
      <div class="badges__list">
        <span v-for="b in badges" :key="b.id" class="badges__item" :class="b.unlocked && 'badges__item--on'">
          <Icon :icon="b.icon" class="badges__icon" /> {{ $t(b.titleKey) }}
        </span>
      </div>
    </div>

    <div class="app__actions">
      <button class="app__reset" @click="showReset = true">{{ $t('stats.reset.button') }}</button>
    </div>

    <ResetDialog v-model="showReset" @confirm="doReset" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import ResetDialog from '../shared/ResetDialog.vue'
import {
  meaningMastered, readingMastered, totalKanji,
  meaningProgress, readingProgress,
  wrongList, badges, loadProgress, resetProgress
} from '../../stores/kanjiStore.js'

const showReset = ref(false)

onMounted(() => loadProgress())

function doReset() {
  showReset.value = false
  resetProgress()
}
</script>
