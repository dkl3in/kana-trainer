export default {
  home: {
    title: 'Kana & Kanji Trainer',
    kana: {
      label: 'Kana',
      desc: 'Learn Hiragana & Katakana'
    },
    kanji: {
      label: 'Kanji N5',
      desc: '85 Kanji for JLPT N5'
    }
  },
  nav: {
    home: 'Home',
    quiz: 'Quiz',
    learn: 'Learn',
    overview: 'Overview',
    stats: 'Stats'
  },
  quiz: {
    correct: 'Correct!',
    wrong: 'Wrong – correct answer: {answer}',
    wrongText: 'Wrong – correct answer:',
    next: 'Next in {n}s',
    nextBtn: 'Next character',
    mastered: '{label} mastered! ★',
    blockMode: {
      label: 'Block mode: {label}',
      exit: '× Back to full quiz'
    }
  },
  learn: {
    toggle: {
      kanaToRomaji: 'Kana → Romaji',
      romajiToKana: 'Romaji → Kana',
      kanjiToMeaning: 'Kanji → Meaning',
      meaningToKanji: 'Meaning → Kanji'
    },
    practiceBlock: 'Practice this block',
    sections: {
      base: 'Base (Gojūon)',
      dakuten: 'Dakuten & Handakuten',
      yoon: 'Yōon (combinations)'
    }
  },
  overview: {
    gojuon: 'Gojūon (五十音)',
    dakuten: 'Dakuten & Handakuten',
    yoon: 'Yōon (拗音)',
    swipeHint: '← Swipe to navigate →',
    close: 'Close',
    onyomi: 'On\'yomi',
    kunyomi: 'Kun\'yomi',
    meaning: 'Meaning',
    example: 'Example'
  },
  stats: {
    title: 'Statistics',
    hiraLevel: 'Hira Level: {n}',
    kataLevel: 'Kata Level: {n}',
    extrasLevel: 'Extras Level: {n}',
    baseMastered: 'Base mastered: {val}',
    yes: 'Yes',
    no: 'No',
    progress: {
      hiraBase: 'Hiragana (Base)',
      kataBase: 'Katakana (Base)',
      extras: 'Extras (Dakuten + Yōon)',
      mastered: '{done} / {total} mastered',
      meaning: 'Meaning',
      reading: 'Reading'
    },
    wrongList: 'Characters with errors (descending)',
    empty: 'No errors yet',
    reset: {
      button: 'Reset progress',
      title: 'Really reset progress?',
      text: 'All progress, statistics and streaks will be permanently deleted. This action cannot be undone.',
      cancel: 'Cancel',
      confirm: 'Yes, delete everything'
    },
    badges: {
      title: 'Badges'
    },
    tags: {
      hira: 'Hira',
      kata: 'Kata'
    }
  },
  badges: {
    firstHit: 'First hit',
    ten: '10 correct',
    internalized: 'First kana internalized',
    fifty: '50 correct',
    hundred: '100 correct',
    hiramastered: 'Hiragana mastered',
    twoHundred: '200 correct',
    katamastered: 'Katakana mastered',
    basemastered: 'Base mastered',
    extrasstarted: 'Extras started',
    dakutenmastered: 'Dakuten mastered',
    yoonmastered: 'Yōon mastered',
    streakmaster: 'Streak master',
    kanjiFirst: 'First step',
    kanjiTen: '10 Kanji',
    kanjiInternalized: 'First kanji internalized',
    kanji25: '25 Kanji mastered',
    kanjiMeaning: 'Meaning master',
    kanjiReading: 'Reading master',
    kanjiComplete: 'N5 Kanji complete',
    kanjiStreak: 'Kanji streak master',
    n5complete: 'N5 complete'
  },
  kanji: {
    quiz: {
      mode: {
        meaning: 'Meaning',
        reading: 'Reading'
      }
    }
  }
}
