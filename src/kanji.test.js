import { describe, it, expect } from 'vitest'
import { n5Kanji, makeKanjiItems, KANJI_CATEGORY_DEFS } from './kanji.js'

// ── Total count ────────────────────────────────────────────────────────────
describe('n5Kanji array', () => {
  it('has 85 entries', () => expect(n5Kanji).toHaveLength(85))
})

// ── Required fields on every entry ────────────────────────────────────────
describe('n5Kanji entry shape', () => {
  it('every entry has required string fields', () => {
    n5Kanji.forEach((entry, i) => {
      expect(typeof entry.kanji, `entry ${i} kanji`).toBe('string')
      expect(entry.kanji.length, `entry ${i} kanji not empty`).toBeGreaterThan(0)
    })
  })

  it('every entry has onyomi as string[]', () => {
    n5Kanji.forEach((entry, i) => {
      expect(Array.isArray(entry.onyomi), `entry ${i} onyomi is array`).toBe(true)
    })
  })

  it('every entry has kunyomi as string[]', () => {
    n5Kanji.forEach((entry, i) => {
      expect(Array.isArray(entry.kunyomi), `entry ${i} kunyomi is array`).toBe(true)
    })
  })

  it('every entry has at least one meaning', () => {
    n5Kanji.forEach((entry, i) => {
      expect(Array.isArray(entry.meaning), `entry ${i} meaning is array`).toBe(true)
      expect(entry.meaning.length, `entry ${i} meaning not empty`).toBeGreaterThan(0)
      expect(typeof entry.meaning[0], `entry ${i} meaning[0] is string`).toBe('string')
    })
  })

  it('every entry has at least one reading (onyomi or kunyomi)', () => {
    n5Kanji.forEach((entry, i) => {
      const totalReadings = entry.onyomi.length + entry.kunyomi.length
      expect(totalReadings, `entry ${i} (${entry.kanji}) has no readings`).toBeGreaterThan(0)
    })
  })

  it('example — if present — has word, reading, meaning strings', () => {
    n5Kanji.forEach((entry, i) => {
      if (entry.example) {
        expect(typeof entry.example.word, `entry ${i} example.word`).toBe('string')
        expect(typeof entry.example.reading, `entry ${i} example.reading`).toBe('string')
        expect(typeof entry.example.meaning, `entry ${i} example.meaning`).toBe('string')
      }
    })
  })
})

// ── No duplicate kanji characters ─────────────────────────────────────────
describe('n5Kanji uniqueness', () => {
  it('no duplicate kanji characters', () => {
    const chars = n5Kanji.map(e => e.kanji)
    const unique = new Set(chars)
    expect(unique.size).toBe(chars.length)
  })
})

// ── KANJI_CATEGORY_DEFS ───────────────────────────────────────────────────
describe('KANJI_CATEGORY_DEFS', () => {
  it('has 9 categories', () => expect(KANJI_CATEGORY_DEFS).toHaveLength(9))

  it('categories cover indices 0–84 without gaps or overlaps', () => {
    let expected = 0
    for (const cat of KANJI_CATEGORY_DEFS) {
      expect(cat.start, `"${cat.label}" start`).toBe(expected)
      expect(cat.end, `"${cat.label}" end > start`).toBeGreaterThan(cat.start)
      expected = cat.end
    }
    expect(expected).toBe(85)
  })

  it('all end indices within array bounds', () => {
    KANJI_CATEGORY_DEFS.forEach(cat => {
      expect(cat.end).toBeLessThanOrEqual(n5Kanji.length)
    })
  })

  it('each category has a non-empty label', () => {
    KANJI_CATEGORY_DEFS.forEach(cat => {
      expect(typeof cat.label).toBe('string')
      expect(cat.label.length).toBeGreaterThan(0)
    })
  })
})

// ── makeKanjiItems ─────────────────────────────────────────────────────────
describe('makeKanjiItems', () => {
  const { meaningItems, readingItems } = makeKanjiItems(n5Kanji)

  it('produces 85 meaning items', () => expect(meaningItems).toHaveLength(85))
  it('produces 85 reading items', () => expect(readingItems).toHaveLength(85))

  it('all 170 item IDs are unique', () => {
    const ids = [...meaningItems, ...readingItems].map(i => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('meaning items have type "meaning"', () => {
    meaningItems.forEach(item => expect(item.type).toBe('meaning'))
  })

  it('reading items have type "reading"', () => {
    readingItems.forEach(item => expect(item.type).toBe('reading'))
  })

  it('meaning items answer is a non-empty string', () => {
    meaningItems.forEach((item, i) => {
      expect(typeof item.answer, `meaning item ${i}`).toBe('string')
      expect(item.answer.length, `meaning item ${i} answer not empty`).toBeGreaterThan(0)
    })
  })

  it('reading items answer (readingStr) is non-empty', () => {
    readingItems.forEach((item, i) => {
      expect(typeof item.answer, `reading item ${i}`).toBe('string')
      expect(item.answer.length, `reading item ${i} answer not empty`).toBeGreaterThan(0)
    })
  })

  it('each item starts with zero correct/wrong/streak and weight 1', () => {
    for (const item of [...meaningItems, ...readingItems]) {
      expect(item.correct).toBe(0)
      expect(item.wrong).toBe(0)
      expect(item.streak).toBe(0)
      expect(item.weight).toBe(1)
    }
  })

  it('meaning items have allMeanings array matching source', () => {
    meaningItems.forEach((item, i) => {
      expect(Array.isArray(item.allMeanings)).toBe(true)
      expect(item.allMeanings).toEqual(n5Kanji[i].meaning)
    })
  })
})
