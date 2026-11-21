# Story authoring (Twee 3 + SugarCube 2)

Stories are authored as Twee 3 source files and compiled to standalone SugarCube HTML. The React application does not interpret Twee itself.

## Tooling

Install:

1. Tweego, the Twee/Twine compiler: https://www.motoslave.net/tweego/
2. The SugarCube 2 story format: https://www.motoslave.net/sugarcube/2/

Tweego and SugarCube are separate tools. Put the SugarCube story-format directory in one of Tweego's recognized `storyformats` directories, or set `TWEEGO_PATH` to the directory containing it. Do not rename the format directory; Tweego uses it as the format ID.

Verify the installation:

```bash
tweego --list-formats
```

The output must include `sugarcube-2`.

If Tweego is not on PATH, set `TWEEGO_BIN` to its executable path. If the format is installed in a custom location, set `TWEEGO_PATH` to that directory.

## Compile stories

```bash
pnpm stories:build
```

The script compiles every locale directory under `stories/<story-id>/` into:

```text
public/stories/<story-id>/<locale>/index.html
```

Compiled HTML is generated output and should not be committed. The Twee source remains the source of truth.

## Story layout

```text
stories/
└── the-city-that-forgot-dawn/
    └── en/
        └── story.twee
```

Add other languages as sibling directories, for example `ar/`. Keep passage names and story logic identical between translations.

## Required passages

Every story should include:

- `StoryTitle`: the player-facing title.
- `StoryData`: JSON metadata containing an IFID, format, format version, and starting passage.
- `StoryInit`: story initialization code when the React runtime bridge is needed.
- The configured starting passage.

Use stable passage names. Links must target existing passage names.

## React runtime bridge

The initial bridge is deliberately read-only. The compiled story sends typed notifications to its parent iframe when:

- The runtime is ready.
- A passage is displayed.
- A passage link is selected.

The message payload contains passage identifiers and display labels, not the complete SugarCube state. The parent verifies the sending iframe and validates every message shape. The iframe is sandboxed and the story is not given a command channel into the React application.

Do not send secrets or account data through this bridge. Do not add arbitrary parent-to-story JavaScript execution.

The current developer preview is available at:

```text
/?engine=preview
```

Compile the story first, then run `pnpm dev` and open that URL.

## Security and trust

Twee/SugarCube stories can contain executable JavaScript. Only compile and run story source that has been reviewed and trusted. The sandbox reduces the story's access to the parent application, but it is not a substitute for reviewing untrusted source.

## Current scope

This phase establishes the authoring and compilation pipeline, a sample Twee 3 story, and a narrow runtime event bridge. It does not yet implement persistent SugarCube state, passage-driven React UI, quests, achievements, decision correction, local saves, or cloud synchronization. Those depend on the runtime lifecycle and save contract being designed and tested in later phases.
