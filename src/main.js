import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router.js'
import i18n from './i18n.js'
import { loadProgress as loadKanaProgress } from './stores/kanaStore.js'
import { loadProgress as loadKanjiProgress } from './stores/kanjiStore.js'

loadKanaProgress()
loadKanjiProgress()

createApp(App).use(router).use(i18n).mount('#app')