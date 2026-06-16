<template>
  <div>
    <!-- Quiz mode tabs -->
    <div class="mode-tabs-wrap" v-if="!blockFocusIds">
      <div class="mode-tabs">
        <button
          class="mode-tabs__btn"
          :class="{ 'mode-tabs__btn--active': quizMode === 'meaning' }"
          @click="setMode('meaning')"
        >{{ $t('kanji.quiz.mode.meaning') }}</button>
        <button
          class="mode-tabs__btn"
          :class="{ 'mode-tabs__btn--active': quizMode === 'reading' }"
          @click="setMode('reading')"
        >{{ $t('kanji.quiz.mode.reading') }}</button>
      </div>
    </div>

    <main class="quiz">
      <div class="block-mode-banner" v-if="blockFocusIds">
        <span class="block-mode-banner__label">{{ $t('quiz.blockMode.label', { label: blockLabel }) }}</span>
        <button class="block-mode-banner__exit" @click="clearBlock">{{ $t('quiz.blockMode.exit') }}</button>
      </div>

      <div class="quiz__prompt">
        <div class="quiz__kana quiz__kana--kanji">{{ current?.kanji }}</div>
      </div>

      <div class="quiz__options">
        <button
          v-for="opt in options"
          :key="opt.id"
          class="quiz__option"
          :class="{
            'quiz__option--correct': answered && opt.id === current?.id,
            'quiz__option--wrong': answered && selectedOpt?.id === opt.id && opt.id !== current?.id
          }"
          :disabled="answered"
          @click="submit(opt)"
        >
          {{ opt.answer }}
        </button>
      </div>

      <div class="quiz__feedback" v-if="answered">
        <p class="quiz__message" :class="{ 'quiz__message--correct': isCorrect, 'quiz__message--wrong': !isCorrect }">
          {{ isCorrect ? $t('quiz.correct') : $t('quiz.wrong', { answer: current.answer }) }}
        </p>
        <p class="quiz__countdown">{{ $t('quiz.next', { n: countdown }) }}</p>
        <button class="quiz__next-link" @click="next">{{ $t('quiz.nextBtn') }}</button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import {
  quizMode, blockFocusIds, blockLabel, activePool,
  weightedPick, sampleOptions, loadProgress
} from '../../stores/kanjiStore.js'

const answered = ref(false)
const isCorrect = ref(false)
const current = ref(null)
const options = ref([])
const selectedOpt = ref(null)

const autoNextTimer = ref(null)
const countdownTimer = ref(null)
const countdown = ref(0)

function clearTimers() {
  if (autoNextTimer.value) { clearTimeout(autoNextTimer.value); autoNextTimer.value = null }
  if (countdownTimer.value) { clearInterval(countdownTimer.value); countdownTimer.value = null }
  countdown.value = 0
}

function startCountdown(seconds) {
  clearTimers()
  countdown.value = seconds
  countdownTimer.value = setInterval(() => { countdown.value = Math.max(0, countdown.value - 1) }, 1000)
  autoNextTimer.value = setTimeout(next, seconds * 1000)
}

function next() {
  clearTimers()
  answered.value = false
  isCorrect.value = false
  selectedOpt.value = null
  current.value = weightedPick(activePool.value)
  options.value = sampleOptions(current.value, activePool.value, 8)
}

function submit(opt) {
  if (answered.value) return
  const correct = opt.id === current.value.id
  isCorrect.value = correct
  selectedOpt.value = opt
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

function setMode(m) {
  quizMode.value = m
  next()
}

function clearBlock() {
  blockFocusIds.value = null
  blockLabel.value = ''
  next()
}

watch(quizMode, next, { flush: 'sync' })

onMounted(() => {
  loadProgress()
  next()
})

onBeforeUnmount(clearTimers)
</script>
