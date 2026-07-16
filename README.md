# PAKU PAKU

A faithful maze-chase arcade game built for the **iD8 Game Creation Competition 2026** (showcase: 22 July, JCU Singapore). Named after *paku-paku* — the Japanese onomatopoeia for munching that inspired the 1980 original.

Steer the **gold muncher**, clear the maze of pellets, and outsmart four ghosts with authentic personality AI.

**Play live:** [https://paku-paku.vercel.app](https://paku-paku.vercel.app)  
**Offline:** open `index.html` — no install, no build, no network required.

## Contributors

- **[TwilightAlpha](https://github.com/TwilightAlpha)** (Alex Thiha) · iD8 · JCU Singapore · 2026

## Controls

| Input | Action |
|---|---|
| Arrows / WASD | Steer |
| Swipe (touch) | Steer |
| M | Mute |
| P | Pause |
| Any key / tap | Start |

## What's technically interesting

The four ghosts run the authentic personality AI from the original arcade game (as documented in the Pac-Man Dossier), each with a different targeting function:

- **Chaser** (red) — targets your current tile
- **Ambusher** (pink) — targets 4 tiles ahead of your facing direction
- **Flanker** (cyan) — mirrors a vector through Chaser's position to pincer you
- **Shy** (orange) — chases when >8 tiles away, retreats to his corner when close

Ghosts alternate global **scatter/chase waves** (7s/20s schedule, shrinking per level) and reverse direction on every mode switch. Movement is grid-locked with **input pre-buffering** — press a turn early and it executes at the corner — which is the detail that makes movement feel tight instead of mushy.

Everything is synthesized: audio is Web Audio oscillators (no samples), graphics are canvas vectors (no sprites). Fixed 60 Hz logic step.

## Architecture

- `index.html` — the game client (canvas + UI). Tuning lives in `CONFIG`.
- `api/leaderboard.js` — single Vercel serverless route for the global top-10 (Upstash Redis / KV).
- `test/` — headless smoke tests (state machine, ghosts, fright, collisions, name entry, mute).
- `PLANNING.md` / `TASKS.md` — roadmap notes.

## Test

```
npm test
```

## Tuning cheat-sheet

All in `CONFIG` (top of `index.html`): `playerSpeed`, `ghostSpeed`, `frightTimeBase`, `modeWaves`, `releaseDelays`, `speedRampPerLevel`.
