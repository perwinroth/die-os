#!/usr/bin/env node
// LAW CHECK — mechanical enforcement of the conduct laws in LAWS.md.
//
// WHY THIS EXISTS: "how can you regress in two messages." A rule that lives only in prose gets
// re-derived and lost. A rule that is grepped does not. The guard, not the memory.
//
// THE LAWS THEMSELVES LIVE IN LAWS.md, dated and append-only. The Lx ids below are its ids; the
// two must never drift. A law that cannot be checked is still written there, marked UNENFORCED,
// so the gap stays visible.
//
// L17 binds this file: severity never decreases, exemptions are explicit and counted, and
// weakening anything needs approver sign-off plus a ruleset version bump.
//
//   node scripts/check-laws.mjs [--config check-laws.config.json]
import fs from "node:fs";
import path from "node:path";

const fails = [], warns = [], exemptions = [];
const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);

// ---- project configuration -------------------------------------------------------------
// The OS ships domain-free. A project declares its own surfaces here; with no config, only the
// laws that need no domain knowledge run.
const cfgPath = process.argv.includes("--config")
  ? process.argv[process.argv.indexOf("--config") + 1]
  : "check-laws.config.json";
const cfg = JSON.parse(read(cfgPath) || "{}");
const READER_FACING = cfg.readerFacing || [];      // copy the approver or the public reads
const PLAIN_SURFACES = cfg.plainSurfaces || [];    // copy-paste surfaces: email, forums, social
const DOMAIN_NOUNS = cfg.domainNouns || [];        // for the OS purity check, if run inside a project

const lines = (s) => s.split("\n").map((l, i) => [i + 1, l]);

// Exemptions are explicit, marked, and counted (L17). A regex whitelist buried in the checker is
// how a linter gets quietly shaped to pass its author. An exempt line carries the marker in the
// line itself, so every exemption is visible in the source, countable, and has a written reason.
function exempt(law, file, ln, text) {
  const m = text.match(new RegExp(`\\[law-exempt ${law}:([^\\]]*)\\]`));
  if (!m) return false;
  exemptions.push(`${file}:${ln} ${law} — ${m[1].trim()}`);
  return true;
}

// ---- L9.1: no em dashes in reader-facing copy · FAILURE -------------------------------
for (const f of READER_FACING) {
  const s = read(f);
  if (!s) { warns.push(`L9: declared reader-facing file missing: ${f}`); continue; }
  for (const [ln, text] of lines(s)) {
    if (!text.includes("—")) continue;
    if (exempt("L9", f, ln, text)) continue;
    fails.push(`L9 EM DASH in reader-facing copy: ${f}:${ln}`);
  }
}

// ---- L9.2: "honest" at most once per piece · FAILURE ----------------------------------
// On repetition a trust word becomes a tell. Both L9 checks are FAILURES, not warnings: they
// were the two soft checks that L17 was written about, and softness there was shaped to the
// author's own habits.
for (const f of READER_FACING) {
  const s = read(f);
  if (!s) continue;
  const hits = [...s.matchAll(/\bhonest(ly)?\b/gi)];
  if (hits.length > 1) fails.push(`L9 "honest" used ${hits.length}x in ${f} (cap is 1, prefer 0)`);
}

// ---- L9.3: plain prose on copy-paste surfaces · FAILURE -------------------------------
for (const f of PLAIN_SURFACES) {
  const s = read(f);
  if (!s) continue;
  for (const [ln, text] of lines(s)) {
    if (!/^\s*(#{1,6}\s|[-*]\s|\d+\.\s|>)|\*\*|`/.test(text)) continue;
    if (exempt("L9", f, ln, text)) continue;
    fails.push(`L9 MARKDOWN on a copy-paste surface: ${f}:${ln}`);
  }
}

// ---- L0: date format · FAILURE --------------------------------------------------------
// Catches the shapes a fabricated date takes: a US-ordered or slashed date where the law
// requires YYYY-MM-DD. It cannot catch a well-formatted date that was guessed; that half stays
// UNENFORCED and is named as such in LAWS.md.
for (const f of [...READER_FACING, ...PLAIN_SURFACES]) {
  const s = read(f);
  if (!s) continue;
  for (const [ln, text] of lines(s)) {
    const m = text.match(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/);
    if (!m) continue;
    if (exempt("L0", f, ln, text)) continue;
    fails.push(`L0 NON-ISO DATE "${m[0]}": ${f}:${ln} (format is YYYY-MM-DD)`);
  }
}

// ---- L17: the checker self-audits against LAWS.md · FAILURE ---------------------------
// Every law marked ENFORCED must have an implementation here. A missing one is a failure, so
// silently deleting a check is not silent.
{
  const laws = read(path.join(path.dirname(cfgPath), "LAWS.md")) || read("LAWS.md") || "";
  const self = read(process.argv[1]) || "";
  const declared = [...laws.matchAll(/^## (L\d+) — .*· ENFORCED(?! \(partial\))/gm)].map((m) => m[1]);
  for (const id of declared) {
    if (!new RegExp(`---- ${id}[.:]`).test(self))
      fails.push(`L17 SELF-AUDIT: ${id} is marked ENFORCED in LAWS.md but has no check in this file`);
  }
}

// ---- OS purity: no domain nouns in the OS layer · FAILURE -----------------------------
if (DOMAIN_NOUNS.length) {
  const re = new RegExp(`\\b(${DOMAIN_NOUNS.join("|")})\\b`, "i");
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    if (e.name === ".git" || e.name === "node_modules") return [];
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith(".md") || p.endsWith(".mjs") ? [p] : [];
  });
  for (const f of walk(".")) {
    if (path.resolve(f) === path.resolve(cfgPath)) continue;
    for (const [ln, text] of lines(read(f) || "")) {
      const m = text.match(re);
      if (!m) continue;
      if (exempt("PURITY", f, ln, text)) continue;
      fails.push(`PURITY domain noun "${m[0]}" in the OS layer: ${f}:${ln}`);
    }
  }
}

// ---- report ---------------------------------------------------------------------------
// Every run prints the exemptions and their count, because growth there is how a linter dies.
if (exemptions.length) {
  console.log(`\nEXEMPTIONS (${exemptions.length}) — growth here is how a linter dies:`);
  for (const e of exemptions) console.log(`  ${e}`);
}
for (const w of warns) console.log(`WARN  ${w}`);
for (const f of fails) console.log(`FAIL  ${f}`);
console.log(`\n${fails.length} failure(s), ${warns.length} warning(s), ${exemptions.length} exemption(s).`);
process.exit(fails.length ? 1 : 0);
