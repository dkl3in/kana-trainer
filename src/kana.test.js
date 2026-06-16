import { describe, it, expect } from 'vitest'
import {
  baseHiragana, baseKatakana,
  extraHiragana, extraKatakana,
  yoonHiragana, yoonKatakana,
  makeItems,
  BASE_ROW_DEFS, DAKUTEN_ROW_DEFS, YOON_ROW_DEFS,
  GOUJUON_TABLE_ROWS
} from './kana.js'

// ── Array sizes ────────────────────────────────────────────────────────────
describe('kana array sizes', () => {
  it('baseHiragana has 46 entries', () => expect(baseHiragana).toHaveLength(46))
  it('baseKatakana has 46 entries', () => expect(baseKatakana).toHaveLength(46))
  it('extraHiragana has 25 entries', () => expect(extraHiragana).toHaveLength(25))
  it('extraKatakana has 25 entries', () => expect(extraKatakana).toHaveLength(25))
  it('yoonHiragana has 33 entries', () => expect(yoonHiragana).toHaveLength(33))
  it('yoonKatakana has 33 entries', () => expect(yoonKatakana).toHaveLength(33))
})

// ── Tuple format [string, string] ──────────────────────────────────────────
describe('kana tuple format', () => {
  const allArrays = [
    ['baseHiragana', baseHiragana],
    ['baseKatakana', baseKatakana],
    ['extraHiragana', extraHiragana],
    ['extraKatakana', extraKatakana],
    ['yoonHiragana', yoonHiragana],
    ['yoonKatakana', yoonKatakana],
  ]
  for (const [name, arr] of allArrays) {
    it(`${name}: every entry is [string, string]`, () => {
      arr.forEach(([kana, romaji], i) => {
        expect(typeof kana, `entry ${i} kana`).toBe('string')
        expect(kana.length, `entry ${i} kana not empty`).toBeGreaterThan(0)
        expect(typeof romaji, `entry ${i} romaji`).toBe('string')
        expect(romaji.length, `entry ${i} romaji not empty`).toBeGreaterThan(0)
      })
    })
  }
})

// ── No duplicate kana within each array ───────────────────────────────────
describe('no duplicate kana characters', () => {
  const allArrays = [
    ['baseHiragana', baseHiragana],
    ['baseKatakana', baseKatakana],
    ['extraHiragana', extraHiragana],
    ['extraKatakana', extraKatakana],
    ['yoonHiragana', yoonHiragana],
    ['yoonKatakana', yoonKatakana],
  ]
  for (const [name, arr] of allArrays) {
    it(`${name}: no duplicate kana`, () => {
      const chars = arr.map(([k]) => k)
      const unique = new Set(chars)
      expect(unique.size).toBe(chars.length)
    })
  }
})

// ── makeItems ID uniqueness ────────────────────────────────────────────────
describe('makeItems', () => {
  it('generates unique IDs across all groups', () => {
    const allItems = [
      ...makeItems(baseHiragana, 'hiragana', 'base'),
      ...makeItems(baseKatakana, 'katakana', 'base'),
      ...makeItems(extraHiragana, 'hiragana', 'extra'),
      ...makeItems(extraKatakana, 'katakana', 'extra'),
      ...makeItems(yoonHiragana, 'hiragana', 'yoon'),
      ...makeItems(yoonKatakana, 'katakana', 'yoon'),
    ]
    const ids = allItems.map(i => i.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('each item has correct shape', () => {
    const items = makeItems(baseHiragana, 'hiragana', 'base')
    items.forEach(item => {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('kana')
      expect(item).toHaveProperty('romaji')
      expect(item.script).toBe('hiragana')
      expect(item.group).toBe('base')
      expect(item.correct).toBe(0)
      expect(item.wrong).toBe(0)
      expect(item.streak).toBe(0)
      expect(item.weight).toBe(1)
    })
  })

  it('total item count matches sum of all arrays', () => {
    const allItems = [
      ...makeItems(baseHiragana, 'hiragana', 'base'),
      ...makeItems(baseKatakana, 'katakana', 'base'),
      ...makeItems(extraHiragana, 'hiragana', 'extra'),
      ...makeItems(extraKatakana, 'katakana', 'extra'),
      ...makeItems(yoonHiragana, 'hiragana', 'yoon'),
      ...makeItems(yoonKatakana, 'katakana', 'yoon'),
    ]
    expect(allItems).toHaveLength(46 + 46 + 25 + 25 + 33 + 33)
  })
})

// ── BASE_ROW_DEFS ──────────────────────────────────────────────────────────
describe('BASE_ROW_DEFS', () => {
  it('has 10 rows', () => expect(BASE_ROW_DEFS).toHaveLength(10))

  it('covers indices 0–45 without gaps or overlaps', () => {
    let expected = 0
    for (const row of BASE_ROW_DEFS) {
      expect(row.start).toBe(expected)
      expect(row.end).toBeGreaterThan(row.start)
      expected = row.end
    }
    expect(expected).toBe(46)
  })

  it('all end indices within array bounds', () => {
    BASE_ROW_DEFS.forEach(row => {
      expect(row.end).toBeLessThanOrEqual(baseHiragana.length)
    })
  })

  it('each row has hLabel and kLabel strings', () => {
    BASE_ROW_DEFS.forEach(row => {
      expect(typeof row.hLabel).toBe('string')
      expect(typeof row.kLabel).toBe('string')
    })
  })
})

// ── DAKUTEN_ROW_DEFS ───────────────────────────────────────────────────────
describe('DAKUTEN_ROW_DEFS', () => {
  it('has 5 rows', () => expect(DAKUTEN_ROW_DEFS).toHaveLength(5))

  it('covers indices 0–24 without gaps', () => {
    let expected = 0
    for (const row of DAKUTEN_ROW_DEFS) {
      expect(row.start).toBe(expected)
      expected = row.end
    }
    expect(expected).toBe(25)
  })
})

// ── YOON_ROW_DEFS ─────────────────────────────────────────────────────────
describe('YOON_ROW_DEFS', () => {
  it('has 11 rows', () => expect(YOON_ROW_DEFS).toHaveLength(11))

  it('covers indices 0–32 without gaps', () => {
    let expected = 0
    for (const row of YOON_ROW_DEFS) {
      expect(row.start).toBe(expected)
      expected = row.end
    }
    expect(expected).toBe(33)
  })
})

// ── GOUJUON_TABLE_ROWS ─────────────────────────────────────────────────────
describe('GOUJUON_TABLE_ROWS', () => {
  it('has 11 rows', () => expect(GOUJUON_TABLE_ROWS).toHaveLength(11))

  it('each row has exactly 5 slots', () => {
    GOUJUON_TABLE_ROWS.forEach(row => {
      expect(row.slots).toHaveLength(5)
    })
  })

  it('all non-null slot indices are valid baseHiragana indices', () => {
    GOUJUON_TABLE_ROWS.forEach(row => {
      row.slots.forEach(slot => {
        if (slot !== null) {
          expect(slot).toBeGreaterThanOrEqual(0)
          expect(slot).toBeLessThan(baseHiragana.length)
        }
      })
    })
  })

  it('no duplicate non-null slot indices', () => {
    const indices = GOUJUON_TABLE_ROWS.flatMap(r => r.slots).filter(s => s !== null)
    expect(new Set(indices).size).toBe(indices.length)
  })
})
