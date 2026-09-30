# Flappy Miku

A Flappy Bird style browser game written from scratch in TypeScript, with no game engine. Everything runs on a single HTML canvas.

## Features
- Menu, gameplay, and game over scenes managed by a small scene system
- Gravity-based player physics and scrolling pipe obstacles with collision detection
- High score saved in `localStorage`
- Sound effects for jump, score, and hit
- Keyboard and touch controls

## Controls
| Action | Input |
|---|---|
| Flap / start | `Space`, `Arrow Up`, or tap |

## Project structure
```
src/
├── core/       Game loop, scene base class, input handling
├── scenes/     MenuScene, GameScene, GameOverScene
├── entities/   Player, Pipe
├── managers/   Asset, audio, and score managers
└── main.ts     Entry point
```

## Getting started
```bash
npm install
npm run dev       # start the Vite dev server
npm run build     # type-check and build to dist/
```

> **Note:** sound effects load from `/audio/jump.wav`, `/audio/score.wav`, and `/audio/hit.wav`. Put them in a `public/audio/` folder, since they aren't included in the repo.

## Tech
TypeScript · Vite · HTML Canvas
