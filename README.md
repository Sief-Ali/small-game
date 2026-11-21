# Choose Your Chaos — The City That Forgot Dawn

A mobile-first branching visual novel built with React, TypeScript, Vite and i18next.

## Run locally

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
pnpm preview
```

## Languages

The game currently supports:

- English (LTR)
- Arabic (RTL)

Use the language toggle in the home screen or story header. The selected language is saved in local storage and restored on the next visit. Switching to Arabic updates the document language and direction and applies RTL layout styles.

Translations are managed with `i18next` and `react-i18next`:

```text
src/modules/choose-your-chaos/i18n/
├── index.ts
└── locales/
    ├── en.json
    └── ar.json
```

The English story content in `data/story.ts` is the fallback source. Arabic narrative, dialogue, choices, conditional story memories and artwork descriptions are stored in `ar.json`. New scenes should add their translation keys to each supported locale.

For a future Next.js App Router migration, the same translation resources can be retained while the integration is adapted to the Next.js runtime. The current project is a Vite React app, so it uses `react-i18next` directly.

## The story

Nera is a city trapped in an endless blue evening. A brass lantern chooses the player, who discovers why the sunrise disappeared and decides what kind of morning the city deserves.

The current story includes:

- Four chapters with three different opening routes.
- Six route-specific events before the story converges.
- Four distinct endings.
- Earlier choices that change small details in later scenes and endings.
- Atmosphere themes that change the scene palette as the story moves.
- Automatic local progress saving, resume and replay.

## Project structure

```text
src/
├── modules/
│   └── choose-your-chaos/
│       ├── components/
│       │   ├── HomeScreen.tsx
│       │   ├── LanguageToggle.tsx
│       │   ├── SceneArtwork.tsx
│       │   └── StoryScreen.tsx
│       ├── data/
│       │   └── story.ts
│       ├── hooks/
│       │   └── useStoryGame.ts
│       ├── i18n/
│       │   ├── index.ts
│       │   └── locales/
│       │       ├── en.json
│       │       └── ar.json
│       ├── lib/
│       │   └── storage.ts
│       ├── pages/
│       │   └── GamePage.tsx
│       └── types.ts
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx
```

Feature-specific UI, state, content, translations and persistence stay inside the feature module. Shared code should only move to top-level shared directories when another feature needs it.

## Story content and branching

All scenes live in `src/modules/choose-your-chaos/data/story.ts`.

Each scene has a stable ID, chapter, atmosphere, artwork reference, paragraphs and choices. A choice points to its next scene through `nextScene`. It can also update story flags that influence conditional paragraphs later in the journey.

The `artwork.key` and `artwork.description` fields are references for future illustrations. `SceneArtwork.tsx` currently renders a themed placeholder; real scene images can be added later without changing the story graph.

## Adding optional questions later

The story types already support `kind: 'question'`, question metadata, and choice-level `signals`. That gives us a clean way to insert short, optional questions between story scenes later. Their answers can be associated with broad preference dimensions without changing the branching story engine.

The current game does not show a personality score or make psychological claims. Signals are only stored locally as groundwork for a future, clearly presented end-of-story reflection.

## Data and privacy

This version is local-first. Progress and choice signals are saved in the current browser on the current device. There is no account, backend, analytics or external database connection.

The `MONGO_DB_MONGODB_URI` variable is not used by this frontend-only version. Never expose a database URI in browser code or commit it to Git.
