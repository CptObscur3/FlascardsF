const sections = require('../data/words.json');

// Flatten the sections into numbered words. Ids run in section order,
// so every section covers a contiguous id range.
const words = [];
const decks = [];
for (const section of sections) {
  const from = words.length + 1;
  for (const [en, uk] of section.words) {
    words.push({ id: words.length + 1, en, uk, section: section.id });
  }
  decks.push({ id: section.id, title: section.title, subtitle: section.subtitle, from, to: words.length });
}
decks.unshift({ id: 'all', title: 'Всі слова', from: 1, to: words.length });
decks.forEach((d) => { d.size = d.to - d.from + 1; });

class Word {
  static all() {
    return words;
  }

  static count() {
    return words.length;
  }

  // Words with ids in [from, to], inclusive.
  static range(from, to) {
    return words.filter((w) => w.id >= from && w.id <= to);
  }

  // "All words" plus one deck per section of the word list.
  static decks() {
    return decks;
  }

  static findDeck(id) {
    return decks.find((d) => d.id === id) || null;
  }
}

module.exports = Word;
