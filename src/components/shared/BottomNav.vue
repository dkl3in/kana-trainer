<template>
  <nav class="bottom-nav">
    <!-- Home button — always present -->
    <button
      class="bottom-nav__btn"
      :class="{ 'bottom-nav__btn--active': isHome }"
      @click="router.push('/')"
      :aria-label="$t('nav.home')"
    >
      <Icon icon="carbon:home" />
    </button>

    <!-- Kana tabs -->
    <template v-if="isKana">
      <button
        class="bottom-nav__btn"
        :class="{ 'bottom-nav__btn--active': route.path === '/kana/quiz' }"
        @click="router.push('/kana/quiz')"
        :aria-label="$t('nav.quiz')"
      >
        <Icon icon="carbon:exam-mode" />
      </button>
      <button
        class="bottom-nav__btn"
        :class="{ 'bottom-nav__btn--active': route.path === '/kana/learn' }"
        @click="router.push('/kana/learn')"
        :aria-label="$t('nav.learn')"
      >
        <Icon icon="carbon:education" />
      </button>
      <button
        class="bottom-nav__btn"
        :class="{ 'bottom-nav__btn--active': route.path === '/kana/overview' }"
        @click="router.push('/kana/overview')"
        :aria-label="$t('nav.overview')"
      >
        <Icon icon="carbon:table" />
      </button>
      <button
        class="bottom-nav__btn"
        :class="{ 'bottom-nav__btn--active': route.path === '/kana/stats' }"
        @click="router.push('/kana/stats')"
        :aria-label="$t('nav.stats')"
      >
        <Icon icon="carbon:analytics" />
      </button>
    </template>

    <!-- Kanji tabs -->
    <template v-else-if="isKanji">
      <button
        class="bottom-nav__btn"
        :class="{ 'bottom-nav__btn--active': route.path === '/kanji/quiz' }"
        @click="router.push('/kanji/quiz')"
        :aria-label="$t('nav.quiz')"
      >
        <Icon icon="carbon:exam-mode" />
      </button>
      <button
        class="bottom-nav__btn"
        :class="{ 'bottom-nav__btn--active': route.path === '/kanji/learn' }"
        @click="router.push('/kanji/learn')"
        :aria-label="$t('nav.learn')"
      >
        <Icon icon="carbon:education" />
      </button>
      <button
        class="bottom-nav__btn"
        :class="{ 'bottom-nav__btn--active': route.path === '/kanji/overview' }"
        @click="router.push('/kanji/overview')"
        :aria-label="$t('nav.overview')"
      >
        <Icon icon="carbon:table" />
      </button>
      <button
        class="bottom-nav__btn"
        :class="{ 'bottom-nav__btn--active': route.path === '/kanji/stats' }"
        @click="router.push('/kanji/stats')"
        :aria-label="$t('nav.stats')"
      >
        <Icon icon="carbon:analytics" />
      </button>
    </template>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const router = useRouter()

const isHome = computed(() => route.path === '/')
const isKana = computed(() => route.path.startsWith('/kana'))
const isKanji = computed(() => route.path.startsWith('/kanji'))
</script>
