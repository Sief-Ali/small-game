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
```

## Story architecture

React owns the complete presentation: story layout, artwork placeholders, atmosphere, choices, navigation and transitions. A framework-independent TypeScript story engine owns passage transitions and story state. No embedded story player or iframe is required.

Story authoring files live outside the app source:

```text
stories/
└── the-city-that-forgot-dawn/
    ├── manifest.json
    ├── en/
    │   ├── story.ts
    │   └── chapters/
    │       ├── chapter-01.ts
    │       ├── chapter-02.ts
    │       ├── chapter-03.ts
    │       ├── chapter-04.ts
    │       ├── chapter-05.ts
    │       ├── chapter-06.ts
    │       └── chapter-07.ts
    └── ar/
        ├── meta.json
        └── chapters/
            ├── chapter-01.json
            ├── chapter-02.json
            ├── chapter-03.json
            ├── chapter-04.json
            ├── chapter-05.json
            ├── chapter-06.json
            └── chapter-07.json
```

The manifest contains acts, chapters, quests, quest objectives and rewards, achievements, checkpoints, endings, presentation defaults and initial state. English chapter modules contain stable passage IDs, body copy, choices, conditions and entry effects. Arabic chapter JSON files contain only translated passage copy and choice labels; IDs and logic always come from the English source.

## Current story content

- 3 acts and 7 chapters.
- 41 passages across the complete story.
- 49 choice links, including inventory/stat/flag-gated options.
- 4 endings.
- 4 quests with objectives and rewards.
- 6 achievements.
- 5 checkpoints.
- Inventory, relationship values, flags and dawn-progress stat.
- One automatic passage transition.
- Arabic and English story text with matching passage and choice IDs.

## Story engine

The engine interprets typed conditions (`all`, `any`, `not`, flags, inventory and stat comparisons) and typed entry effects (quest updates, rewards, relationships, inventory, achievements, checkpoints, chapter progress and endings). These are plain data—not SugarCube macros or executable story scripts.

## Saving

The current version saves progress locally in the browser. The save schema has been versioned for this story migration, so old prototype saves are not mixed with the new seven-chapter story. Accounts, cloud saves and cross-device sync remain a separate backend milestone.
