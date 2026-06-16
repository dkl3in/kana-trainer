import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './components/HomeView.vue'
import KanaQuizView from './components/kana/KanaQuizView.vue'
import KanaLearnView from './components/kana/KanaLearnView.vue'
import KanaOverviewView from './components/kana/KanaOverviewView.vue'
import KanaStatsView from './components/kana/KanaStatsView.vue'
import KanjiQuizView from './components/kanji/KanjiQuizView.vue'
import KanjiLearnView from './components/kanji/KanjiLearnView.vue'
import KanjiOverviewView from './components/kanji/KanjiOverviewView.vue'
import KanjiStatsView from './components/kanji/KanjiStatsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/kana/quiz', component: KanaQuizView },
  { path: '/kana/learn', component: KanaLearnView },
  { path: '/kana/overview', component: KanaOverviewView },
  { path: '/kana/stats', component: KanaStatsView },
  { path: '/kanji/quiz', component: KanjiQuizView },
  { path: '/kanji/learn', component: KanjiLearnView },
  { path: '/kanji/overview', component: KanjiOverviewView },
  { path: '/kanji/stats', component: KanjiStatsView },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
