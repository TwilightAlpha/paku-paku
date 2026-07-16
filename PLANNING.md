# PLANNING.md — PAKU PAKU
**Target: WIN the iD8 Game Creation Competition — Showcase Wed 22 July 2026, 4:00 PM, C2-14**
**Today: Thu 9 July. Runway: 13 days.**

---

## 1. Why this wins

The showcase is judged by **students and visitors playing games live and voting**. That means the winner is not the deepest game — it's the game that:

1. **Gets played the most times** (short runs, instant pickup, no instructions needed)
2. **Feels the best in the first 10 seconds** (juice, sound, responsiveness)
3. **Looks unlike everything else in the room** (most entries will be default-asset Unity/Scratch projects; a coherent navy-and-gold minimal aesthetic stands out immediately)
4. **Creates a crowd** (visible leaderboard → competition → people queue to beat the top score → the queue itself advertises the booth)

Maze-chase is the correct genre for this: proven fun since 1980, everyone already knows how to play, and runs are naturally short.

## 2. Positioning

- **Not** "Pac-Man clone." Pitch line: *"An original twilight arcade game — collect the light, escape the shadows."*
- The 4 shadow AI personalities are the technical depth story if judges ask "what's hard about this?" — you explain the chase/ambush/flank/wander targeting system. That's a real CS answer, not "I followed a tutorial."
- Tasogare aesthetic = your existing brand. The game IS a portfolio piece after the competition.

## 3. Scope

### MUST (ship or the game doesn't exist)
- Maze render, grid movement, mote collection, 4 shadows with personality AI
- Flare power-up + vulnerable mode + eating shadows
- Lives (3), score, level progression (speed up per level, same maze is fine)
- Death, game over, restart loop
- Synthesized audio + mute
- Keyboard + touch input
- Title screen with one-line instructions

### SHOULD (this is where votes come from)
- Full juice pass: particles, screen shake, score pops, combo pitch
- Leaderboard with 3-letter name entry
- Attract mode demo
- Difficulty tuning from real playtests (target: average first run 45–90s, players say "one more try")

### WON'T (do not touch before July 22)
- Multiple maze layouts, level editor, mobile app packaging, multiplayer, story/lore screens, account systems, settings menus beyond mute.

## 4. Milestones (hard dates)

| Date | Milestone | Definition of done |
|---|---|---|
| **Fri 11 Jul** | Playable core | Maze renders, player moves and eats motes, 1 dumb shadow kills you. Ugly is fine. |
| **Mon 14 Jul** | Full loop | All 4 AI personalities, flare mode, lives, score, levels, game over → restart. Game is *complete* but plain. |
| **Thu 17 Jul** | Juiced + skinned | Tasogare art pass, particles, shake, full audio, title screen. Looks like a finished product. |
| **Sat 19 Jul** | Showcase-ready | Leaderboard, attract mode, touch controls verified on phone, 5+ external playtests done, tuning locked. |
| **Mon 20 Jul** | **FEATURE FREEZE** | Bug fixes only. No exceptions. |
| **Tue 21 Jul** | Dress rehearsal | Full run on the actual showcase laptop, offline, from a double-clicked index.html. Charger packed. Backup on USB stick + Vercel + phone. |
| **Wed 22 Jul** | Showcase 4:00 PM | Arrive early, attract mode running before doors open. |

**Rule: if a milestone slips by more than 1 day, cut from SHOULD, never delay the freeze.**

## 5. Known risks (named honestly)

1. **The historical risk is you, not the tech.** The pattern across Nerve, Pikfolio, and the previous 18 game concepts: energy drains into concept/branding/naming and the deliverable ships late or never. Countermeasure is built in: identity is pre-locked (TASOGARE, navy/gold), and the first milestone is *ugly but playable* in 48 hours. If on Friday 11 July there is no moving square eating dots on screen, that's the alarm.
2. **Ghost AI rabbit hole.** The personality system can absorb days of tweaking. Implement the textbook targeting rules, tune twice, stop.
3. **Showcase environment.** No wifi assumption, unknown laptop, bright room. Mitigated by zero-dependency build, offline-first, high-contrast glow palette, dress rehearsal on the 21st.
4. **Scope creep in week 2.** Every "what if we added—" gets written into a POST_COMPETITION.md and ignored.

## 6. Showcase day playbook

- Laptop at full brightness, sound on (bring small speaker if allowed), attract mode looping.
- Leaderboard visible = the marketing. Open with your own mediocre score on it so it looks beatable.
- Your pitch when someone hesitates: **"Thirty seconds. Beat the top score."** Nothing else.
- Keep a phone with the Vercel URL as backup device if the laptop dies.

## 7. Stack (locked)

Vanilla JS, HTML5 Canvas, Web Audio API. Three files. Deployed to Vercel + runs offline. Built in Cursor with Claude agent mode following CLAUDE.md.
