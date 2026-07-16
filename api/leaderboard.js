const { kv } = require("@vercel/kv");

const KEY = "paku:leaderboard";
const TOP = 10;
const MAX_SCORE = 999999;

function sanitizeName(raw) {
  const s = String(raw ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 20);
  return s || "PLAYER";
}

function parseScore(n) {
  const score = Number(n);
  if (!Number.isFinite(score) || score < 0 || score > MAX_SCORE) return null;
  return Math.floor(score);
}

function nameFromMember(member) {
  if (member == null) return null;
  if (typeof member === "object") return member.name != null ? String(member.name) : null;
  if (typeof member === "string") {
    try {
      const parsed = JSON.parse(member);
      if (parsed && typeof parsed === "object" && parsed.name != null) return String(parsed.name);
    } catch (_) { /* plain string member */ }
    return member;
  }
  return null;
}

async function top10() {
  // High scores first. withScores → [member, score, member, score, ...]
  // Members may arrive as objects if the store auto-parses JSON strings.
  const raw = await kv.zrange(KEY, 0, TOP - 1, { rev: true, withScores: true });
  const out = [];
  if (!Array.isArray(raw) || !raw.length) return out;

  for (let i = 0; i < raw.length; i += 2) {
    const name = nameFromMember(raw[i]);
    if (name == null) continue;
    out.push({ name: sanitizeName(name), score: Math.floor(Number(raw[i + 1])) || 0 });
  }
  return out;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    if (req.method === "GET") {
      return res.status(200).json(await top10());
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      const name = sanitizeName(body.name);
      const score = parseScore(body.score);
      if (score === null) {
        return res.status(400).json({ error: "invalid score" });
      }
      // Unique member so the same display name can appear more than once
      const member = JSON.stringify({
        name,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      });
      await kv.zadd(KEY, { score, member });
      // Drop everything below the top TOP (sorted set is ascending by score)
      await kv.zremrangebyrank(KEY, 0, -(TOP + 1));
      return res.status(200).json(await top10());
    }

    res.setHeader("Allow", "GET, POST, OPTIONS");
    return res.status(405).json({ error: "method not allowed" });
  } catch (err) {
    console.error("leaderboard error", err);
    return res.status(500).json({ error: "leaderboard unavailable" });
  }
};
