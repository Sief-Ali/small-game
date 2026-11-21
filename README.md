# Choose Your Chaos

A tiny, mobile-first choice game made with React, TypeScript and Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Features

- Five short, funny scenario challenges
- Choice-specific reactions
- A playful end-of-game vibe check based on accumulated choice tags
- Automatic progress saving in the browser's localStorage
- Resume, replay and start-fresh controls
- Responsive, mobile-first layout

## Data and privacy

This first version is intentionally local-first. Game progress is stored in the current browser on the current device. There is no account, backend, analytics, or external database connection.

A MongoDB connection is not needed for local saves. The provided `MONGO_DB_MONGODB_URI` environment variable is therefore not used or copied into this repository. Never expose a database URI in frontend code or commit it to Git.
