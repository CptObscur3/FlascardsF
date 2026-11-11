# Family Cards

English → Ukrainian flashcards: family & relationships vocabulary (stages in life, weddings, phrasal verbs, idioms…). Node.js + Express + EJS, MVC structure.

## Run

```
npm install
npm start
```

Open http://localhost:3000

## Static build / GitHub Pages

GitHub Pages can't run Node, so `npm run build` renders every page (through the same
controllers and views) into `dist/` as plain HTML. `BASE_PATH` sets the URL prefix,
e.g. `/Vcards` for `https://<user>.github.io/Vcards/`.

Deployment is automatic: `.github/workflows/deploy.yml` builds and publishes `dist/`
on every push to `main`. One-time setup: repo **Settings → Pages → Source: GitHub Actions**.

## Structure

```
app.js                 Express setup (entry point)
routes/index.js        URL → controller mapping
controllers/           home (deck list), study (flashcards), words (dictionary + JSON API)
models/Word.js         Loads data/words.json, numbers the words, one deck per section
data/words.json        Sections: { id, title, subtitle, words: [[en, uk], ...] }
views/                 EJS templates (+ partials/header, footer)
public/css, public/js  Styles, card logic, progress (localStorage)
```

## How it works

- Pick a deck: all words, or one section (Stages in life, Weddings, Idioms, ...).
- The front of the card shows the English word. Click it or press Space to see the Ukrainian translation.
- **Знаю** (→) marks the word as learned. **Не знаю** (←) puts it back into the deck a few cards later.
- Progress is saved in the browser (localStorage). The **UA → EN** toggle reverses the cards.
- `GET /api/words?from=1&to=15` returns the words as JSON.
