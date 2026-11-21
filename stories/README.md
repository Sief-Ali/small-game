# Story authoring

Story content is organized by story, locale and chapter.

```text
stories/<story-id>/
├── manifest.json
├── en/
│   ├── story.ts
│   └── chapters/
│       ├── chapter-01.ts
│       └── ...
└── ar/
    ├── meta.json
    └── chapters/
        ├── chapter-01.json
        └── ...
```

## English source

Each English chapter exports a `Record<string, StoryPassage>`. Every passage has a stable ID, act/chapter IDs, type, background reference, body paragraphs, choices, and typed entry effects.

A choice has a stable ID, a target passage, and an optional condition. Supported conditions are:

- `all` / `any` groups and `not`
- Boolean story flags
- Inventory membership
- Numeric stat comparisons (`gt`, `gte`, `lt`, `lte`, `eq`)

Passage effects are declarative data. The engine supports flag changes, stat increments, inventory items, chapter events, quest starts/objectives/completion and rewards, relationship changes, achievement unlocks, checkpoints and discovered endings.

## Arabic translation

Arabic files mirror passage IDs, paragraph order and choice IDs. They contain translated text only. Do not add or change branching logic in translation files. The app loads these files into the `story` i18next namespace.

## Adding passages or chapters

1. Add the passage to the appropriate English chapter module.
2. Add matching Arabic copy under the same passage ID and choice IDs.
3. Update `manifest.json` when adding acts, chapters, quests, achievements, checkpoints or endings.
4. Connect the passage using `nextPassage` or a choice's `nextPassage`.
5. Run `pnpm build`, inspect story validation output, then play through the affected routes.

Keep passage and choice IDs stable because saves and translations depend on them. Use the typed effect and condition unions rather than embedding SugarCube macros, arbitrary JavaScript or UI-specific code in story data.
