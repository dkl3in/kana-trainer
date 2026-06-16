<template>
  <div class="learn">
    <div class="learn__controls">
      <div class="learn__toggle-group">
        <button
          class="learn__toggle"
          :class="{ 'learn__toggle--active': direction === 'kanji-to-meaning' }"
          @click="direction = 'kanji-to-meaning'"
        >{{ $t('learn.toggle.kanjiToMeaning') }}</button>
        <button
          class="learn__toggle"
          :class="{ 'learn__toggle--active': direction === 'meaning-to-kanji' }"
          @click="direction = 'meaning-to-kanji'"
        >{{ $t('learn.toggle.meaningToKanji') }}</button>
      </div>
    </div>

    <div v-for="cat in categories" :key="cat.label" class="learn__section">
      <h3 class="learn__section-title">{{ cat.label }}</h3>
      <div class="learn-row">
        <div class="learn-row__header">
          <span class="learn-row__label">{{ cat.items.length }} Kanji</span>
          <button class="learn-row__practice-btn" @click="handlePracticeBlock(cat.items, cat.label)">
            {{ $t('learn.practiceBlock') }}
          </button>
        </div>
        <div class="learn-row__grid">
          <div
            v-for="item in cat.items"
            :key="item.kanji"
            class="card card--kanji"
            :class="{ 'card--flipped': flipped.has(item.kanji) }"
            @click="toggleFlip(item.kanji)"
          >
            <div class="card__inner">
              <div class="card__front card__front--kanji">
                <span>{{ direction === 'kanji-to-meaning' ? item.kanji : item.allMeanings[0] }}</span>
              </div>
              <div class="card__back card__back--kanji">
                <template v-if="direction === 'kanji-to-meaning'">
                  <span class="card__meaning">{{ item.allMeanings.join(', ') }}</span>
                  <span class="card__reading-row" v-if="item.onyomi.length">
                    <span class="card__reading-label">On:</span> {{ item.onyomi.join('、') }}
                  </span>
                  <span class="card__reading-row" v-if="item.kunyomi.length">
                    <span class="card__reading-label">Kun:</span> {{ item.kunyomi.join('、') }}
                  </span>
                  <span v-if="item.example" class="card__example">{{ item.example.word }}</span>
                </template>
                <template v-else>
                  <span class="card__kanji-large">{{ item.kanji }}</span>
                  <span class="card__reading-row" v-if="item.onyomi.length">
                    <span class="card__reading-label">On:</span> {{ item.onyomi.join('、') }}
                  </span>
                  <span class="card__reading-row" v-if="item.kunyomi.length">
                    <span class="card__reading-label">Kun:</span> {{ item.kunyomi.join('、') }}
                  </span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { KANJI_CATEGORY_DEFS } from '../../kanji.js'
import { meaningItems, blockFocusIds, blockLabel } from '../../stores/kanjiStore.js'

const router = useRouter()

const direction = ref('kanji-to-meaning')
const flipped = ref(new Set())

function toggleFlip(key) {
  const s = new Set(flipped.value)
  if (s.has(key)) s.delete(key)
  else s.add(key)
  flipped.value = s
}

const categories = computed(() =>
  KANJI_CATEGORY_DEFS.map(cat => ({
    label: cat.label,
    items: meaningItems.slice(cat.start, cat.end)
  }))
)

function handlePracticeBlock(items, label) {
  blockFocusIds.value = new Set(items.map(i => i.id))
  blockLabel.value = label
  router.push('/kanji/quiz')
}
</script>
