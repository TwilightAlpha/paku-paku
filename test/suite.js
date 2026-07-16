let failures = [];
const assert = (cond, msg) => { if (!cond) failures.push(msg); else console.log("PASS:", msg); };
newGame();
assert(G.state === "READY", "newGame enters READY");
assert(dotsLeft === 244, "244 dots loaded");
for (let i = 0; i < 60*3; i++) update(1/60);
assert(G.state === "PLAY", "READY -> PLAY");
const dirs = ["up","down","left","right"];
for (let i = 0; i < 60*30 && G.state === "PLAY"; i++) {
  if (i % 20 === 0) player.nextDir = dirs[(Math.random()*4)|0];
  update(1/60);
  if (i % 10 === 0) draw();
}
assert(true, "30s random play + draw: no crash");
assert(player.acc < 2, "no accumulator leak while blocked, acc=" + player.acc.toFixed(2));
G.state = "PLAY"; G.stateT = 0; player.deathT = 0; G.freeze = 0;
let pp = null;
for (let r = 0; r < ROWS && !pp; r++) for (let c = 0; c < COLS; c++) if (grid[r][c] === "o") { pp = {c,r}; break; }
const pc2 = centerOf(pp.c, pp.r); player.x = pc2.x; player.y = pc2.y; player.dir = "left";
update(1/60);
assert(G.fright > 0, "power pellet triggers fright");
const g0 = ghosts[0]; g0.mode = "active"; g0.x = player.x; g0.y = player.y;
const s0 = G.score; update(1/60);
assert(g0.mode === "eaten", "frightened ghost eaten");
assert(G.score - s0 >= 200, "combo scoring works");
G.state = "PLAY"; G.fright = 0; G.freeze = 0;
ghosts[0].mode = "active"; ghosts[0].x = player.x; ghosts[0].y = player.y;
update(1/60);
assert(G.state === "DYING", "collision -> DYING");
const lb = G.lives;
for (let i = 0; i < 60*3; i++) update(1/60);
assert(G.lives === lb - 1 && G.state === "READY", "death -> life lost -> READY");
for (let i = 0; i < 60*3; i++) update(1/60);
assert(G.state === "PLAY", "back to PLAY");
let lastDot = null;
for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
  const ch = grid[r][c];
  if (ch === "." || ch === "o") { if (lastDot) grid[lastDot.r][lastDot.c] = " "; lastDot = {c,r}; }
}
let n = 0; for (const row of grid) for (const ch of row) if (ch==="."||ch==="o") n++;
dotsLeft = n;
const lc = centerOf(lastDot.c, lastDot.r); player.x = lc.x; player.y = lc.y; player.acc = 0;
update(1/60);
assert(G.state === "CLEAR", "last dot -> CLEAR, state=" + G.state);
const lvl = G.level;
for (let i = 0; i < 60*3; i++) update(1/60);
assert(G.level === lvl + 1, "level incremented");
assert(dotsLeft === 244, "maze refilled");
G.lives = 1; G.state = "PLAY"; G.stateT = 0; G.fright = 0; G.freeze = 0;
ghosts[0].mode = "active"; ghosts[0].x = player.x; ghosts[0].y = player.y;
for (let i = 0; i < 60*6 && G.state !== "GAMEOVER"; i++) update(1/60);
assert(G.state === "GAMEOVER", "last life -> GAMEOVER");
for (let i = 0; i < 60*3; i++) update(1/60);
assert(G.state === "INITIALS", "qualifying score -> INITIALS entry");
draw();
console.log(failures.length ? "\nFAILURES:\n" + failures.join("\n") : "\nALL TESTS PASSED");
process.exit(failures.length ? 1 : 0);
