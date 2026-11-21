# Choose Your Chaos

A tiny, mobile-first choice game made with React, TypeScript and Vite.

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

## Project structure

```text
src/
├── modules/
│   └── choose-your-chaos/
│       ├── components/   # Feature UI
│       ├── data/         # Challenges and result labels
│       ├── hooks/        # Game state and flow
│       ├── lib/          # Feature-specific persistence
│       ├── pages/        # Feature page composition
│       └── types.ts      # Feature types
├── styles/               # Global styles
├── App.tsx               # Application entry composition
└── main.tsx              # React bootstrap
```

Feature-specific code stays inside its module. Shared components, hooks, and utilities belong in top-level shared directories only when more than one feature needs them.

## Features

- Five short, funny scenario challenges
- Choice-specific reactions
- A playful end-of-game vibe check based on accumulated choice tags
- Automatic progress saving in the browser's localStorage
- Resume, replay and start-fresh controls
- Responsive, mobile-first layout

## Data and privacy

This first version is intentionally local-first. Game progress is stored in the current browser on the current device. There is no account, backend, analytics, or external database connection.

A MongoDB connection is not needed for local saves. The `MONGO_DB_MONGODB_URI` environment variable is therefore not used or copied into this repository. Never expose a database URI in frontend code or commit it to Git.
