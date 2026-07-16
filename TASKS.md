# TASKS.md — day-by-day to July 22

Rule: work top to bottom. A day's tasks unfinished → they eat the next day's, and a SHOULD feature dies to compensate. Never the reverse.

## Thu 9 Jul (today) — Skeleton
- [ ] Create repo `tasogare-maze`, push empty index.html/game.js/style.css, deploy to Vercel once (pipeline proven on day 1)
- [ ] Canvas + game loop (fixed timestep logic, rAF render), FPS counter
- [ ] Maze defined as string array, rendered as tiles (walls/paths/motes)
- [ ] CONFIG object with all tunables

## Fri 10–11 Jul — Core movement (MILESTONE: playable core, Fri EOD 11th)
- [ ] Player entity: grid-locked movement, direction buffering (pressing a turn early queues it — this is what makes movement feel good, do not skip)
- [ ] Keyboard (arrows + WASD) input
- [ ] Mote collection + score + "all motes eaten = level clear"
- [ ] One shadow with naive chase, collision = lose a life, 3 lives, game over state

## Sat 12 – Mon 14 Jul — Real game (MILESTONE: full loop, Mon EOD)
- [ ] 4 shadow personalities: Chaser / Ambusher / Flanker / Wanderer targeting (see CLAUDE.md)
- [ ] Scatter/chase mode timer, shadows reverse direction on mode switch
- [ ] Shadow house: staggered release at level start and after being eaten
- [ ] Flare pickup → vulnerable mode → eat shadows → escalating bonus (200/400/800/1600)
- [ ] Level progression: speed multiplier per level, shorter flare duration
- [ ] Death sequence + respawn, tunnel wrap on maze sides
- [ ] Touch input: swipe to change direction, test on your phone

## Tue 15 – Thu 17 Jul — Tasogare pass (MILESTONE: juiced, Thu EOD)
- [ ] Art: navy maze with glow-edge walls, gold lantern player, 4 desaturated shadow spirits, flare-mode color drain
- [ ] Particles: mote pickup, shadow eaten, death burst
- [ ] Screen shake (death, shadow eaten), score pop floating text
- [ ] Web Audio: mote pickup with rising combo pitch, flare jingle, death, level clear, ambient hum. Mute button.
- [ ] Title screen: TASOGARE wordmark, "COLLECT THE LIGHT · ESCAPE THE SHADOWS · ARROWS OR SWIPE", press-any-key
- [ ] HUD: score, high score, lives as small lanterns, level

## Fri 18 – Sat 19 Jul — Showcase features (MILESTONE: showcase-ready, Sat EOD)
- [ ] Game over → 3-letter arcade name entry → session top-10 leaderboard screen
- [ ] Attract mode after 20s idle
- [ ] Playtest with 5+ real people (Bryson counts, Naing counts, hostel mates count). Watch silently. Note: where they die first, whether they retry, whether they understood flares without being told
- [ ] Tune from notes: shadow speeds, flare duration, level 1 difficulty (level 1 must be beatable by a first-timer ~half the time)

## Sun 20 Jul — FEATURE FREEZE
- [ ] Bug fixes only
- [ ] Test offline: double-click index.html with wifi off, full run
- [ ] Test on the lowest-spec machine you can find

## Mon 21 Jul — Dress rehearsal
- [ ] Full setup on the actual showcase laptop: brightness, sound, attract mode
- [ ] Backups: USB stick, Vercel URL, copy on phone
- [ ] Pack: laptop, charger, mouse if wanted, small speaker if allowed
- [ ] Seed leaderboard with one modest score

## Wed 22 Jul — Showcase, 4:00 PM, C2-14
- [ ] Arrive 30+ min early, attract mode running before visitors enter
- [ ] Pitch: "Thirty seconds. Beat the top score."
