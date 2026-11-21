# Story authoring

Story sources are organized by story and locale:

```text
stories/<story-id>/
├── manifest.json
└── <locale>/
    ├── story.ts
    ├── helpers.ts
    └── chapters/
        ├── chapter-01.ts
        └── ...
```

## Rules

- Keep passage IDs stable. Saves and translations refer to them.
- Keep choice IDs stable. They are used in history and translated choice labels.
- Every `nextScene` must point to a passage in the same story.
- Keep narrative copy, choice labels and artwork descriptions in story content, not in React components.
- Put conditional memories behind explicit story flags and minimum values.
- A choice may update `flags` and `signals`; these are accumulated by the story engine.
- Endings have `kind: 'ending'` and no outgoing choices.
- Keep translated passages aligned by passage ID, choice ID and paragraph order.

The current React UI reads the typed story definition and renders it. The engine does not render HTML and does not know about React, routes, accounts or cloud storage.

## Adding a chapter

1. Add a typed chapter module under the locale's `chapters/` directory.
2. Export a `Record<string, StoryScene>` from that module.
3. Import and merge it in the locale's `story.ts` entry point.
4. Update the story manifest and translations.
5. Run `pnpm build` and play through each affected route.
