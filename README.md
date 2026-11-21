# Choose Your Chaos — The City That Forgot Dawn

A React-rendered branching visual novel built with React, TypeScript, Vite and i18next.

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

## Architecture

- **React** owns the complete presentation: passage layout, artwork, atmosphere, choices, navigation and transitions.
- **Story engine** is a framework-independent TypeScript module. It resolves the current passage and applies choice consequences to story state.
- **Story files** live in the top-level `stories/` directory, grouped by story, locale and chapter.
- **Local persistence** currently keeps progress in the browser. The storage boundary will be extended for account-backed cloud saves and synchronization without making the story renderer depend on the backend.
- **i18next** currently supplies English and Arabic UI/story translations. Arabic uses RTL layout.

## Story content

```text
stories/
└── the-city-that-forgot-dawn/
    ├── manifest.json
    └── en/
        ├── story.ts
        ├── helpers.ts
        └── chapters/
            ├── chapter-01.ts
            ├── chapter-02.ts
            ├── chapter-03.ts
            └── chapter-04.ts
```

The manifest identifies the story, its start passage, chapter count and supported locales. Each chapter exports a map of passages. Passage IDs and choice IDs are stable identifiers; translations must preserve them. Choice definitions can change story flags and signals, and can route to another passage using `nextScene`.

English is the source language for the current story. Existing Arabic story translations remain in the i18next Arabic resource while the content migration is completed. UI translations stay in the feature's i18n directory.

## Current story

- Four chapters.
- Three different opening routes.
- Six route-specific events before the story converges.
- Four endings.
- Earlier choices influence later conditional passages.
- Atmosphere and artwork references are part of each passage.
- Local progress saving, continue and replay.

## Development status

The React story UI is the active renderer. The story engine is deliberately independent of React and browser APIs. Account authentication, cloud storage and cross-device synchronization are not implemented yet; they will be added behind a persistence/API boundary.
