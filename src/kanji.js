/**
 * @typedef {Object} KanjiExample
 * @property {string} word    - Example word in kanji/kana
 * @property {string} reading - Furigana reading
 * @property {string} meaning - German translation
 */

/**
 * Raw kanji data entry as stored in n5Kanji.
 * @typedef {Object} KanjiEntry
 * @property {string}          kanji    - The kanji character
 * @property {string[]}        onyomi   - On'yomi readings (katakana)
 * @property {string[]}        kunyomi  - Kun'yomi readings (hiragana)
 * @property {string[]}        meaning  - German meanings; meaning[0] is the primary answer
 * @property {KanjiExample}    [example] - Optional example word
 */

/**
 * A single kanji quiz item (reactive).
 * @typedef {Object} KanjiItem
 * @property {string}          id         - Unique ID: `kanji-${type}-${idx}-${kanji}`
 * @property {string}          kanji      - The kanji character
 * @property {string}          prompt     - What is shown in the quiz (= kanji)
 * @property {string}          answer     - Correct answer text (meaning or readingStr)
 * @property {string[]}        allMeanings
 * @property {string[]}        onyomi
 * @property {string[]}        kunyomi
 * @property {string}          readingStr - On'yomi + Kun'yomi joined with " · "
 * @property {KanjiExample|null} example
 * @property {'meaning'|'reading'} type
 * @property {number}          correct
 * @property {number}          wrong
 * @property {number}          streak
 * @property {number}          weight
 */

/**
 * A category group definition used by KanjiLearnView and KanjiOverviewView.
 * @typedef {Object} KanjiCategoryDef
 * @property {string} label - Display label
 * @property {number} start - Start index (inclusive) into n5Kanji
 * @property {number} end   - End index (exclusive) into n5Kanji
 */

// JLPT N5 Kanji — 85 characters in standard JLPT frequency/level order
// Format: { kanji, onyomi[], kunyomi[], meaning[], example? }
export const n5Kanji = [
  // Numbers
  { kanji: '一', onyomi: ['イチ', 'イツ'], kunyomi: ['ひと-', 'ひとつ'], meaning: ['eins', '1'], example: { word: '一人', reading: 'ひとり', meaning: 'eine Person' } },
  { kanji: '二', onyomi: ['ニ'], kunyomi: ['ふた-', 'ふたつ'], meaning: ['zwei', '2'], example: { word: '二月', reading: 'にがつ', meaning: 'Februar' } },
  { kanji: '三', onyomi: ['サン'], kunyomi: ['みっ-', 'みつ'], meaning: ['drei', '3'], example: { word: '三人', reading: 'さんにん', meaning: 'drei Personen' } },
  { kanji: '四', onyomi: ['シ'], kunyomi: ['よ-', 'よん', 'よっつ'], meaning: ['vier', '4'], example: { word: '四月', reading: 'しがつ', meaning: 'April' } },
  { kanji: '五', onyomi: ['ゴ'], kunyomi: ['いつ-', 'いつつ'], meaning: ['fünf', '5'], example: { word: '五時', reading: 'ごじ', meaning: '5 Uhr' } },
  { kanji: '六', onyomi: ['ロク'], kunyomi: ['むっ-', 'むつ'], meaning: ['sechs', '6'], example: { word: '六月', reading: 'ろくがつ', meaning: 'Juni' } },
  { kanji: '七', onyomi: ['シチ'], kunyomi: ['なな-', 'ななつ'], meaning: ['sieben', '7'], example: { word: '七時', reading: 'しちじ', meaning: '7 Uhr' } },
  { kanji: '八', onyomi: ['ハチ'], kunyomi: ['やっ-', 'やつ'], meaning: ['acht', '8'], example: { word: '八月', reading: 'はちがつ', meaning: 'August' } },
  { kanji: '九', onyomi: ['キュウ', 'ク'], kunyomi: ['ここの-', 'ここのつ'], meaning: ['neun', '9'], example: { word: '九時', reading: 'くじ', meaning: '9 Uhr' } },
  { kanji: '十', onyomi: ['ジュウ', 'ジッ'], kunyomi: ['とお', 'と'], meaning: ['zehn', '10'], example: { word: '十月', reading: 'じゅうがつ', meaning: 'Oktober' } },
  { kanji: '百', onyomi: ['ヒャク'], kunyomi: [], meaning: ['hundert', '100'], example: { word: '三百', reading: 'さんびゃく', meaning: 'dreihundert' } },
  { kanji: '千', onyomi: ['セン'], kunyomi: ['ち'], meaning: ['tausend', '1000'], example: { word: '千円', reading: 'せんえん', meaning: 'tausend Yen' } },
  { kanji: '万', onyomi: ['マン', 'バン'], kunyomi: [], meaning: ['zehntausend', '10.000'], example: { word: '一万', reading: 'いちまん', meaning: 'zehntausend' } },
  // Time
  { kanji: '年', onyomi: ['ネン'], kunyomi: ['とし'], meaning: ['Jahr'], example: { word: '今年', reading: 'ことし', meaning: 'dieses Jahr' } },
  { kanji: '月', onyomi: ['ゲツ', 'ガツ'], kunyomi: ['つき'], meaning: ['Monat', 'Mond'], example: { word: '今月', reading: 'こんげつ', meaning: 'diesen Monat' } },
  { kanji: '日', onyomi: ['ニチ', 'ジツ'], kunyomi: ['ひ', 'か'], meaning: ['Tag', 'Sonne'], example: { word: '今日', reading: 'きょう', meaning: 'heute' } },
  { kanji: '時', onyomi: ['ジ'], kunyomi: ['とき'], meaning: ['Zeit', 'Uhr', 'Stunde'], example: { word: '何時', reading: 'なんじ', meaning: 'wie viel Uhr' } },
  { kanji: '分', onyomi: ['フン', 'ブン'], kunyomi: ['わか-'], meaning: ['Minute', 'teilen', 'verstehen'], example: { word: '五分', reading: 'ごふん', meaning: 'fünf Minuten' } },
  { kanji: '半', onyomi: ['ハン'], kunyomi: ['なか-'], meaning: ['halb'], example: { word: '三時半', reading: 'さんじはん', meaning: 'halb vier' } },
  { kanji: '週', onyomi: ['シュウ'], kunyomi: [], meaning: ['Woche'], example: { word: '先週', reading: 'せんしゅう', meaning: 'letzte Woche' } },
  // Nature
  { kanji: '山', onyomi: ['サン'], kunyomi: ['やま'], meaning: ['Berg'], example: { word: '山道', reading: 'やまみち', meaning: 'Bergpfad' } },
  { kanji: '川', onyomi: ['セン'], kunyomi: ['かわ'], meaning: ['Fluss'], example: { word: '川岸', reading: 'かわぎし', meaning: 'Flussufer' } },
  { kanji: '田', onyomi: ['デン'], kunyomi: ['た'], meaning: ['Reisfeld'], example: { word: '田んぼ', reading: 'たんぼ', meaning: 'Reisfeld' } },
  { kanji: '木', onyomi: ['モク', 'ボク'], kunyomi: ['き'], meaning: ['Baum', 'Holz'], example: { word: '木曜日', reading: 'もくようび', meaning: 'Donnerstag' } },
  { kanji: '林', onyomi: ['リン'], kunyomi: ['はやし'], meaning: ['Wald (klein)'], example: { word: '林道', reading: 'りんどう', meaning: 'Waldweg' } },
  { kanji: '森', onyomi: ['シン'], kunyomi: ['もり'], meaning: ['Wald (groß)'], example: { word: '森林', reading: 'しんりん', meaning: 'Wald' } },
  { kanji: '火', onyomi: ['カ'], kunyomi: ['ひ'], meaning: ['Feuer'], example: { word: '火曜日', reading: 'かようび', meaning: 'Dienstag' } },
  { kanji: '水', onyomi: ['スイ'], kunyomi: ['みず'], meaning: ['Wasser'], example: { word: '水曜日', reading: 'すいようび', meaning: 'Mittwoch' } },
  { kanji: '土', onyomi: ['ド', 'ト'], kunyomi: ['つち'], meaning: ['Erde', 'Boden'], example: { word: '土曜日', reading: 'どようび', meaning: 'Samstag' } },
  { kanji: '金', onyomi: ['キン', 'コン'], kunyomi: ['かね'], meaning: ['Gold', 'Geld'], example: { word: '金曜日', reading: 'きんようび', meaning: 'Freitag' } },
  { kanji: '空', onyomi: ['クウ'], kunyomi: ['そら', 'あ-'], meaning: ['Himmel', 'Luft', 'leer'], example: { word: '青空', reading: 'あおぞら', meaning: 'blauer Himmel' } },
  { kanji: '雨', onyomi: ['ウ'], kunyomi: ['あめ'], meaning: ['Regen'], example: { word: '雨の日', reading: 'あめのひ', meaning: 'Regentag' } },
  // Directions & Places
  { kanji: '上', onyomi: ['ジョウ', 'ショウ'], kunyomi: ['うえ', 'うわ-', 'あ-'], meaning: ['oben', 'hoch'], example: { word: '上手', reading: 'じょうず', meaning: 'geschickt' } },
  { kanji: '下', onyomi: ['カ', 'ゲ'], kunyomi: ['した', 'しも', 'さ-'], meaning: ['unten', 'tief'], example: { word: '地下', reading: 'ちか', meaning: 'Untergrund' } },
  { kanji: '中', onyomi: ['チュウ'], kunyomi: ['なか'], meaning: ['Mitte', 'innen'], example: { word: '中学校', reading: 'ちゅうがっこう', meaning: 'Mittelschule' } },
  { kanji: '大', onyomi: ['ダイ', 'タイ'], kunyomi: ['おお-'], meaning: ['groß'], example: { word: '大学', reading: 'だいがく', meaning: 'Universität' } },
  { kanji: '小', onyomi: ['ショウ'], kunyomi: ['ちい-', 'こ-', 'お-'], meaning: ['klein'], example: { word: '小学校', reading: 'しょうがっこう', meaning: 'Grundschule' } },
  { kanji: '左', onyomi: ['サ'], kunyomi: ['ひだり'], meaning: ['links'], example: { word: '左手', reading: 'ひだりて', meaning: 'linke Hand' } },
  { kanji: '右', onyomi: ['ウ', 'ユウ'], kunyomi: ['みぎ'], meaning: ['rechts'], example: { word: '右手', reading: 'みぎて', meaning: 'rechte Hand' } },
  { kanji: '東', onyomi: ['トウ'], kunyomi: ['ひがし'], meaning: ['Osten'], example: { word: '東京', reading: 'とうきょう', meaning: 'Tokio' } },
  { kanji: '西', onyomi: ['セイ', 'サイ'], kunyomi: ['にし'], meaning: ['Westen'], example: { word: '関西', reading: 'かんさい', meaning: 'Kansai-Region' } },
  { kanji: '南', onyomi: ['ナン', 'ナ'], kunyomi: ['みなみ'], meaning: ['Süden'], example: { word: '南口', reading: 'みなみぐち', meaning: 'Südausgang' } },
  { kanji: '北', onyomi: ['ホク'], kunyomi: ['きた'], meaning: ['Norden'], example: { word: '北口', reading: 'きたぐち', meaning: 'Nordausgang' } },
  // People & Body
  { kanji: '人', onyomi: ['ジン', 'ニン'], kunyomi: ['ひと'], meaning: ['Mensch', 'Person'], example: { word: '日本人', reading: 'にほんじん', meaning: 'Japaner' } },
  { kanji: '口', onyomi: ['コウ', 'ク'], kunyomi: ['くち'], meaning: ['Mund', 'Eingang'], example: { word: '入口', reading: 'いりぐち', meaning: 'Eingang' } },
  { kanji: '手', onyomi: ['シュ'], kunyomi: ['て'], meaning: ['Hand'], example: { word: '手紙', reading: 'てがみ', meaning: 'Brief' } },
  { kanji: '目', onyomi: ['モク', 'ボク'], kunyomi: ['め'], meaning: ['Auge'], example: { word: '目的', reading: 'もくてき', meaning: 'Ziel, Zweck' } },
  { kanji: '耳', onyomi: ['ジ'], kunyomi: ['みみ'], meaning: ['Ohr'], example: { word: '耳鼻科', reading: 'じびか', meaning: 'HNO-Abteilung' } },
  { kanji: '足', onyomi: ['ソク'], kunyomi: ['あし', 'た-'], meaning: ['Fuß', 'Bein'], example: { word: '足音', reading: 'あしおと', meaning: 'Schrittgeräusch' } },
  // Family
  { kanji: '父', onyomi: ['フ'], kunyomi: ['ちち'], meaning: ['Vater'], example: { word: '父親', reading: 'ちちおや', meaning: 'Vater' } },
  { kanji: '母', onyomi: ['ボ'], kunyomi: ['はは'], meaning: ['Mutter'], example: { word: '母親', reading: 'ははおや', meaning: 'Mutter' } },
  { kanji: '子', onyomi: ['シ', 'ス'], kunyomi: ['こ'], meaning: ['Kind'], example: { word: '子供', reading: 'こども', meaning: 'Kind' } },
  { kanji: '女', onyomi: ['ジョ', 'ニョ'], kunyomi: ['おんな'], meaning: ['Frau', 'weiblich'], example: { word: '女の子', reading: 'おんなのこ', meaning: 'Mädchen' } },
  { kanji: '男', onyomi: ['ダン', 'ナン'], kunyomi: ['おとこ'], meaning: ['Mann', 'männlich'], example: { word: '男の人', reading: 'おとこのひと', meaning: 'Mann' } },
  // Places & Buildings
  { kanji: '学', onyomi: ['ガク'], kunyomi: ['まな-'], meaning: ['Lernen', 'Schule'], example: { word: '大学生', reading: 'だいがくせい', meaning: 'Student' } },
  { kanji: '校', onyomi: ['コウ'], kunyomi: [], meaning: ['Schule'], example: { word: '学校', reading: 'がっこう', meaning: 'Schule' } },
  { kanji: '先', onyomi: ['セン'], kunyomi: ['さき'], meaning: ['vorher', 'vorne', 'Spitze'], example: { word: '先生', reading: 'せんせい', meaning: 'Lehrer' } },
  { kanji: '生', onyomi: ['セイ', 'ショウ'], kunyomi: ['い-', 'う-', 'なま'], meaning: ['Leben', 'geboren', 'roh'], example: { word: '先生', reading: 'せんせい', meaning: 'Lehrer' } },
  { kanji: '本', onyomi: ['ホン'], kunyomi: ['もと'], meaning: ['Buch', 'Ursprung'], example: { word: '日本語', reading: 'にほんご', meaning: 'Japanisch' } },
  { kanji: '語', onyomi: ['ゴ'], kunyomi: ['かた-'], meaning: ['Sprache', 'sprechen'], example: { word: '日本語', reading: 'にほんご', meaning: 'Japanisch' } },
  { kanji: '国', onyomi: ['コク'], kunyomi: ['くに'], meaning: ['Land', 'Nation'], example: { word: '外国', reading: 'がいこく', meaning: 'Ausland' } },
  { kanji: '外', onyomi: ['ガイ', 'ゲ'], kunyomi: ['そと', 'はず-'], meaning: ['außen', 'fremd'], example: { word: '外国人', reading: 'がいこくじん', meaning: 'Ausländer' } },
  // Verbs & Actions
  { kanji: '見', onyomi: ['ケン'], kunyomi: ['み-'], meaning: ['sehen', 'schauen'], example: { word: '見物', reading: 'けんぶつ', meaning: 'Besichtigung' } },
  { kanji: '聞', onyomi: ['ブン', 'モン'], kunyomi: ['き-'], meaning: ['hören', 'fragen'], example: { word: '新聞', reading: 'しんぶん', meaning: 'Zeitung' } },
  { kanji: '言', onyomi: ['ゲン', 'ゴン'], kunyomi: ['い-'], meaning: ['sagen', 'sprechen'], example: { word: '言語', reading: 'げんご', meaning: 'Sprache' } },
  { kanji: '食', onyomi: ['ショク'], kunyomi: ['た-', 'く-'], meaning: ['essen', 'Essen'], example: { word: '食べ物', reading: 'たべもの', meaning: 'Essen, Lebensmittel' } },
  { kanji: '飲', onyomi: ['イン'], kunyomi: ['の-'], meaning: ['trinken'], example: { word: '飲み物', reading: 'のみもの', meaning: 'Getränk' } },
  { kanji: '来', onyomi: ['ライ'], kunyomi: ['く-', 'き-', 'こ-'], meaning: ['kommen'], example: { word: '来年', reading: 'らいねん', meaning: 'nächstes Jahr' } },
  { kanji: '行', onyomi: ['コウ', 'ギョウ'], kunyomi: ['い-', 'おこな-'], meaning: ['gehen'], example: { word: '旅行', reading: 'りょこう', meaning: 'Reise' } },
  { kanji: '買', onyomi: ['バイ'], kunyomi: ['か-'], meaning: ['kaufen'], example: { word: '買い物', reading: 'かいもの', meaning: 'Einkaufen' } },
  { kanji: '読', onyomi: ['ドク'], kunyomi: ['よ-'], meaning: ['lesen'], example: { word: '読書', reading: 'どくしょ', meaning: 'Lektüre' } },
  { kanji: '書', onyomi: ['ショ'], kunyomi: ['か-'], meaning: ['schreiben'], example: { word: '図書館', reading: 'としょかん', meaning: 'Bibliothek' } },
  // Common adjectives & concepts
  { kanji: '白', onyomi: ['ハク', 'ビャク'], kunyomi: ['しろ', 'しら-'], meaning: ['weiß'], example: { word: '白黒', reading: 'しろくろ', meaning: 'Schwarz-Weiß' } },
  { kanji: '黒', onyomi: ['コク'], kunyomi: ['くろ'], meaning: ['schwarz'], example: { word: '黒板', reading: 'こくばん', meaning: 'Tafel' } },
  { kanji: '赤', onyomi: ['セキ', 'シャク'], kunyomi: ['あか'], meaning: ['rot'], example: { word: '赤ちゃん', reading: 'あかちゃん', meaning: 'Baby' } },
  { kanji: '青', onyomi: ['セイ', 'ショウ'], kunyomi: ['あお'], meaning: ['blau', 'grün'], example: { word: '青空', reading: 'あおぞら', meaning: 'blauer Himmel' } },
  // Additional N5
  { kanji: '入', onyomi: ['ニュウ'], kunyomi: ['い-', 'はい-'], meaning: ['eintreten', 'einsetzen'], example: { word: '入口', reading: 'いりぐち', meaning: 'Eingang' } },
  { kanji: '出', onyomi: ['シュツ', 'スイ'], kunyomi: ['で-', 'だ-'], meaning: ['herausgehen', 'ausgehen'], example: { word: '出口', reading: 'でぐち', meaning: 'Ausgang' } },
  { kanji: '前', onyomi: ['ゼン'], kunyomi: ['まえ'], meaning: ['vorne', 'vorher'], example: { word: '名前', reading: 'なまえ', meaning: 'Name' } },
  { kanji: '後', onyomi: ['ゴ', 'コウ'], kunyomi: ['あと', 'うしろ', 'おく-'], meaning: ['nach', 'hinten', 'später'], example: { word: '午後', reading: 'ごご', meaning: 'Nachmittag' } },
  { kanji: '何', onyomi: ['カ'], kunyomi: ['なに', 'なん'], meaning: ['was', 'wie viel'], example: { word: '何語', reading: 'なにご', meaning: 'welche Sprache' } },
  { kanji: '今', onyomi: ['コン', 'キン'], kunyomi: ['いま'], meaning: ['jetzt', 'gegenwärtig'], example: { word: '今日', reading: 'きょう', meaning: 'heute' } },
  { kanji: '長', onyomi: ['チョウ'], kunyomi: ['なが-'], meaning: ['lang', 'Chef'], example: { word: '長い', reading: 'ながい', meaning: 'lang' } },
  { kanji: '高', onyomi: ['コウ'], kunyomi: ['たか-'], meaning: ['hoch', 'teuer'], example: { word: '高校', reading: 'こうこう', meaning: 'Oberschule' } },
  { kanji: '新', onyomi: ['シン'], kunyomi: ['あたら-', 'にい-'], meaning: ['neu'], example: { word: '新幹線', reading: 'しんかんせん', meaning: 'Shinkansen' } }
]

/**
 * Creates meaning and reading quiz items from raw kanji data.
 * Each kanji produces two items: one meaning item and one reading item.
 * @param {KanjiEntry[]} arr
 * @returns {{ meaningItems: KanjiItem[], readingItems: KanjiItem[] }}
 */
export function makeKanjiItems(arr) {
  const meaningItems = []
  const readingItems = []

  arr.forEach((entry, idx) => {
    const readingStr = [
      ...entry.onyomi,
      ...entry.kunyomi
    ].join(' · ')

    meaningItems.push({
      id: `kanji-meaning-${idx}-${entry.kanji}`,
      kanji: entry.kanji,
      prompt: entry.kanji,
      answer: entry.meaning[0],
      allMeanings: entry.meaning,
      onyomi: entry.onyomi,
      kunyomi: entry.kunyomi,
      readingStr,
      example: entry.example ?? null,
      type: 'meaning',
      correct: 0, wrong: 0, streak: 0, weight: 1
    })

    readingItems.push({
      id: `kanji-reading-${idx}-${entry.kanji}`,
      kanji: entry.kanji,
      prompt: entry.kanji,
      answer: readingStr,
      allMeanings: entry.meaning,
      onyomi: entry.onyomi,
      kunyomi: entry.kunyomi,
      readingStr,
      example: entry.example ?? null,
      type: 'reading',
      correct: 0, wrong: 0, streak: 0, weight: 1
    })
  })

  return { meaningItems, readingItems }
}

/** @type {KanjiCategoryDef[]} */
export const KANJI_CATEGORY_DEFS = [
  { label: 'Zahlen (1–13)', start: 0, end: 13 },
  { label: 'Zeit', start: 13, end: 20 },
  { label: 'Natur', start: 20, end: 32 },
  { label: 'Richtungen & Positionen', start: 32, end: 43 },
  { label: 'Mensch & Körper', start: 43, end: 54 },
  { label: 'Schule & Sprache', start: 54, end: 62 },
  { label: 'Verben & Handlungen', start: 62, end: 72 },
  { label: 'Farben', start: 72, end: 76 },
  { label: 'Weitere N5', start: 76, end: 85 }
]
