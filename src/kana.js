/**
 * @typedef {'hiragana'|'katakana'} KanaScript
 * @typedef {'base'|'extra'|'yoon'} KanaGroup
 */

/**
 * A single kana quiz item (reactive).
 * @typedef {Object} KanaItem
 * @property {string}     id       - Unique ID: `${script}-${group}-${idx}-${kana}`
 * @property {string}     kana     - The kana character(s)
 * @property {string}     romaji   - Romanised pronunciation
 * @property {KanaScript} script
 * @property {KanaGroup}  group
 * @property {number}     correct  - Total correct answers (persisted)
 * @property {number}     wrong    - Total wrong answers (persisted)
 * @property {number}     streak   - Current consecutive correct streak (persisted)
 * @property {number}     weight   - Pick weight for weighted random selection (persisted)
 */

/**
 * A row definition used by LearnView and OverviewView.
 * @typedef {Object} RowDef
 * @property {string} hLabel - Hiragana row label
 * @property {string} kLabel - Katakana row label
 * @property {number} start  - Start index (inclusive) into the source array
 * @property {number} end    - End index (exclusive) into the source array
 */

export const baseHiragana = [
  ['あ','a'], ['い','i'], ['う','u'], ['え','e'], ['お','o'],
  ['か','ka'], ['き','ki'], ['く','ku'], ['け','ke'], ['こ','ko'],
  ['さ','sa'], ['し','shi'], ['す','su'], ['せ','se'], ['そ','so'],
  ['た','ta'], ['ち','chi'], ['つ','tsu'], ['て','te'], ['と','to'],
  ['な','na'], ['に','ni'], ['ぬ','nu'], ['ね','ne'], ['の','no'],
  ['は','ha'], ['ひ','hi'], ['ふ','fu'], ['へ','he'], ['ほ','ho'],
  ['ま','ma'], ['み','mi'], ['む','mu'], ['め','me'], ['も','mo'],
  ['や','ya'], ['ゆ','yu'], ['よ','yo'],
  ['ら','ra'], ['り','ri'], ['る','ru'], ['れ','re'], ['ろ','ro'],
  ['わ','wa'], ['を','wo'],
  ['ん','n']
]

export const baseKatakana = [
  ['ア','a'], ['イ','i'], ['ウ','u'], ['エ','e'], ['オ','o'],
  ['カ','ka'], ['キ','ki'], ['ク','ku'], ['ケ','ke'], ['コ','ko'],
  ['サ','sa'], ['シ','shi'], ['ス','su'], ['セ','se'], ['ソ','so'],
  ['タ','ta'], ['チ','chi'], ['ツ','tsu'], ['テ','te'], ['ト','to'],
  ['ナ','na'], ['ニ','ni'], ['ヌ','nu'], ['ネ','ne'], ['ノ','no'],
  ['ハ','ha'], ['ヒ','hi'], ['フ','fu'], ['ヘ','he'], ['ホ','ho'],
  ['マ','ma'], ['ミ','mi'], ['ム','mu'], ['メ','me'], ['モ','mo'],
  ['ヤ','ya'], ['ユ','yu'], ['ヨ','yo'],
  ['ラ','ra'], ['リ','ri'], ['ル','ru'], ['レ','re'], ['ロ','ro'],
  ['ワ','wa'], ['ヲ','wo'],
  ['ン','n']
]

export const extraHiragana = [
  ['が','ga'], ['ぎ','gi'], ['ぐ','gu'], ['げ','ge'], ['ご','go'],
  ['ざ','za'], ['じ','ji'], ['ず','zu'], ['ぜ','ze'], ['ぞ','zo'],
  ['だ','da'], ['ぢ','ji'], ['づ','zu'], ['で','de'], ['ど','do'],
  ['ば','ba'], ['び','bi'], ['ぶ','bu'], ['べ','be'], ['ぼ','bo'],
  ['ぱ','pa'], ['ぴ','pi'], ['ぷ','pu'], ['ぺ','pe'], ['ぽ','po']
]

export const extraKatakana = [
  ['ガ','ga'], ['ギ','gi'], ['グ','gu'], ['ゲ','ge'], ['ゴ','go'],
  ['ザ','za'], ['ジ','ji'], ['ズ','zu'], ['ゼ','ze'], ['ゾ','zo'],
  ['ダ','da'], ['ヂ','ji'], ['ヅ','zu'], ['デ','de'], ['ド','do'],
  ['バ','ba'], ['ビ','bi'], ['ブ','bu'], ['ベ','be'], ['ボ','bo'],
  ['パ','pa'], ['ピ','pi'], ['プ','pu'], ['ペ','pe'], ['ポ','po']
]

export const yoonHiragana = [
  ['きゃ','kya'], ['きゅ','kyu'], ['きょ','kyo'],
  ['ぎゃ','gya'], ['ぎゅ','gyu'], ['ぎょ','gyo'],
  ['しゃ','sha'], ['しゅ','shu'], ['しょ','sho'],
  ['じゃ','ja'], ['じゅ','ju'], ['じょ','jo'],
  ['ちゃ','cha'], ['ちゅ','chu'], ['ちょ','cho'],
  ['にゃ','nya'], ['にゅ','nyu'], ['にょ','nyo'],
  ['ひゃ','hya'], ['ひゅ','hyu'], ['ひょ','hyo'],
  ['びゃ','bya'], ['びゅ','byu'], ['びょ','byo'],
  ['ぴゃ','pya'], ['ぴゅ','pyu'], ['ぴょ','pyo'],
  ['みゃ','mya'], ['みゅ','myu'], ['みょ','myo'],
  ['りゃ','rya'], ['りゅ','ryu'], ['りょ','ryo']
]

export const yoonKatakana = [
  ['キャ','kya'], ['キュ','kyu'], ['キョ','kyo'],
  ['ギャ','gya'], ['ギュ','gyu'], ['ギョ','gyo'],
  ['シャ','sha'], ['シュ','shu'], ['ショ','sho'],
  ['ジャ','ja'], ['ジュ','ju'], ['ジョ','jo'],
  ['チャ','cha'], ['チュ','chu'], ['チョ','cho'],
  ['ニャ','nya'], ['ニュ','nyu'], ['ニョ','nyo'],
  ['ヒャ','hya'], ['ヒュ','hyu'], ['ヒョ','hyo'],
  ['ビャ','bya'], ['ビュ','byu'], ['ビョ','byo'],
  ['ピャ','pya'], ['ピュ','pyu'], ['ピョ','pyo'],
  ['ミャ','mya'], ['ミュ','myu'], ['ミョ','myo'],
  ['リャ','rya'], ['リュ','ryu'], ['リョ','ryo']
]

/**
 * Creates reactive quiz items from a raw kana array.
 * @param {[string, string][]} arr    - Array of [kana, romaji] tuples
 * @param {KanaScript}         script - Script type
 * @param {KanaGroup}          group  - Group type
 * @returns {KanaItem[]}
 */
export const makeItems = (arr, script, group) =>
  arr.map(([kana, romaji], idx) => ({
    id: `${script}-${group}-${idx}-${kana}`,
    kana, romaji, script, group,
    correct: 0, wrong: 0, streak: 0, weight: 1
  }))

// Row definitions for the Learn tab
// start/end are indices into base*Hiragana / base*Katakana arrays
export const BASE_ROW_DEFS = [
  { hLabel: 'あ行 (a-Reihe)',      kLabel: 'ア行 (a-Reihe)',      start: 0,  end: 5  },
  { hLabel: 'か行 (ka-Reihe)',     kLabel: 'カ行 (ka-Reihe)',     start: 5,  end: 10 },
  { hLabel: 'さ行 (sa-Reihe)',     kLabel: 'サ行 (sa-Reihe)',     start: 10, end: 15 },
  { hLabel: 'た行 (ta-Reihe)',     kLabel: 'タ行 (ta-Reihe)',     start: 15, end: 20 },
  { hLabel: 'な行 (na-Reihe)',     kLabel: 'ナ行 (na-Reihe)',     start: 20, end: 25 },
  { hLabel: 'は行 (ha-Reihe)',     kLabel: 'ハ行 (ha-Reihe)',     start: 25, end: 30 },
  { hLabel: 'ま行 (ma-Reihe)',     kLabel: 'マ行 (ma-Reihe)',     start: 30, end: 35 },
  { hLabel: 'や行 (ya-Reihe)',     kLabel: 'ヤ行 (ya-Reihe)',     start: 35, end: 38 },
  { hLabel: 'ら行 (ra-Reihe)',     kLabel: 'ラ行 (ra-Reihe)',     start: 38, end: 43 },
  { hLabel: 'わ行・ん (wa-Reihe)', kLabel: 'ワ行・ン (wa-Reihe)', start: 43, end: 46 },
]

export const DAKUTEN_ROW_DEFS = [
  { hLabel: 'が行 (ga-Reihe)', kLabel: 'ガ行 (ga-Reihe)', start: 0,  end: 5  },
  { hLabel: 'ざ行 (za-Reihe)', kLabel: 'ザ行 (za-Reihe)', start: 5,  end: 10 },
  { hLabel: 'だ行 (da-Reihe)', kLabel: 'ダ行 (da-Reihe)', start: 10, end: 15 },
  { hLabel: 'ば行 (ba-Reihe)', kLabel: 'バ行 (ba-Reihe)', start: 15, end: 20 },
  { hLabel: 'ぱ行 (pa-Reihe)', kLabel: 'パ行 (pa-Reihe)', start: 20, end: 25 },
]

export const YOON_ROW_DEFS = [
  { hLabel: 'きゃ行 (kya-Reihe)', kLabel: 'キャ行 (kya-Reihe)', start: 0,  end: 3  },
  { hLabel: 'ぎゃ行 (gya-Reihe)', kLabel: 'ギャ行 (gya-Reihe)', start: 3,  end: 6  },
  { hLabel: 'しゃ行 (sha-Reihe)', kLabel: 'シャ行 (sha-Reihe)', start: 6,  end: 9  },
  { hLabel: 'じゃ行 (ja-Reihe)',  kLabel: 'ジャ行 (ja-Reihe)',  start: 9,  end: 12 },
  { hLabel: 'ちゃ行 (cha-Reihe)', kLabel: 'チャ行 (cha-Reihe)', start: 12, end: 15 },
  { hLabel: 'にゃ行 (nya-Reihe)', kLabel: 'ニャ行 (nya-Reihe)', start: 15, end: 18 },
  { hLabel: 'ひゃ行 (hya-Reihe)', kLabel: 'ヒャ行 (hya-Reihe)', start: 18, end: 21 },
  { hLabel: 'びゃ行 (bya-Reihe)', kLabel: 'ビャ行 (bya-Reihe)', start: 21, end: 24 },
  { hLabel: 'ぴゃ行 (pya-Reihe)', kLabel: 'ピャ行 (pya-Reihe)', start: 24, end: 27 },
  { hLabel: 'みゃ行 (mya-Reihe)', kLabel: 'ミャ行 (mya-Reihe)', start: 27, end: 30 },
  { hLabel: 'りゃ行 (rya-Reihe)', kLabel: 'リャ行 (rya-Reihe)', start: 30, end: 33 },
]

// Gojūon table slot definitions for OverviewView
// slots are indices into base*Hiragana/base*Katakana; null = empty cell
export const GOUJUON_TABLE_ROWS = [
  { consonant: '–', slots: [0,  1,    2,    3,    4   ] },
  { consonant: 'k', slots: [5,  6,    7,    8,    9   ] },
  { consonant: 's', slots: [10, 11,   12,   13,   14  ] },
  { consonant: 't', slots: [15, 16,   17,   18,   19  ] },
  { consonant: 'n', slots: [20, 21,   22,   23,   24  ] },
  { consonant: 'h', slots: [25, 26,   27,   28,   29  ] },
  { consonant: 'm', slots: [30, 31,   32,   33,   34  ] },
  { consonant: 'y', slots: [35, null, 36,   null, 37  ] },
  { consonant: 'r', slots: [38, 39,   40,   41,   42  ] },
  { consonant: 'w', slots: [43, null, null, null, 44  ] },
  { consonant: 'n', slots: [45, null, null, null, null] },
]
