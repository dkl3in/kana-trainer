<template>
  <section class="stats">
    <h2 class="stats__title">{{ $t('stats.title') }}</h2>

    <div class="app__status">
      <span>{{ $t('stats.hiraLevel', { n: hiraLevel + 1 }) }}</span>
      <span>{{ $t('stats.kataLevel', { n: kataLevel + 1 }) }}</span>
      <span>{{ $t('stats.extrasLevel', { n: extraLevel + 1 }) }}</span>
      <span>{{ $t('stats.baseMastered', { val: baseMastered ? $t('stats.yes') : $t('stats.no') }) }}</span>
    </div>

    <div class="progress">
      <div class="progress__block">
        <div class="progress__label">{{ $t('stats.progress.hiraBase') }}</div>
        <div class="progress__bar">
          <div class="progress__fill" :style="{ width: hiraProgress + '%' }"></div>
        </div>
        <div class="progress__text">{{ $t('stats.progress.mastered', { done: hiraMastered, total: totalHiraBase }) }}</div>
      </div>
      <div class="progress__block">
        <div class="progress__label">{{ $t('stats.progress.kataBase') }}</div>
        <div class="progress__bar">
          <div class="progress__fill progress__fill--accent" :style="{ width: kataProgress + '%' }"></div>
        </div>
        <div class="progress__text">{{ $t('stats.progress.mastered', { done: kataMastered, total: totalKataBase }) }}</div>
      </div>
      <div class="progress__block">
        <div class="progress__label">{{ $t('stats.progress.extras') }}</div>
        <div class="progress__bar">
          <div class="progress__fill progress__fill--gold" :style="{ width: extraProgress + '%' }"></div>
        </div>
        <div class="progress__text">{{ $t('stats.progress.mastered', { done: extraMastered, total: totalExtras }) }}</div>
      </div>
    </div>

    <p class="stats__subtitle">{{ $t('stats.wrongList') }}</p>

    <div class="stats__list">
      <div v-for="item in wrongList" :key="item.id" class="stats__card">
        <div class="stats__card-left">
          <span class="stats__kana">{{ item.kana }}</span>
          <span class="stats__romaji">{{ item.romaji }}</span>
        </div>
        <span class="stats__script-tag">{{ item.script === 'hiragana' ? $t('stats.tags.hira') : $t('stats.tags.kata') }}</span>
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
  hiraLevel, kataLevel, extraLevel, baseMastered,
  hiraMastered, kataMastered, extraMastered,
  totalHiraBase, totalKataBase, totalExtras,
  hiraProgress, kataProgress, extraProgress,
  wrongList, badges, loadProgress, resetProgress
} from '../../stores/kanaStore.js'

const showReset = ref(false)

onMounted(() => loadProgress())

function doReset() {
  showReset.value = false
  resetProgress()
}
</script>
