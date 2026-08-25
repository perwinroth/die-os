#!/usr/bin/env node
// DOMAIN PURITY — the one test this repository must pass.
//
// DIE-OS ships roles, gates, and laws. Nothing in it may know what you are building. This script
// is the mechanical form of that claim, because a README asserting purity is a preference and a
// script asserting it is a fact.
//
// Nouns live in domain-nouns.txt (one per line, '#' comments ignored). Add your project's nouns
// there when you vendor this repo, so the check keeps working as your domain grows.
//
//   node scripts/check-domain-purity.mjs
import fs from "node:fs";
import path from "node:path";

const SELF = new Set(["scripts/check-domain-purity.mjs", "domain-nouns.txt", "domain-nouns.local.txt", ".gitignore"]);
const NOUNFILE = fs.existsSync("domain-nouns.local.txt") ? "domain-nouns.local.txt" : "domain-nouns.txt";
const nouns = (fs.existsSync(NOUNFILE) ? fs.readFileSync(NOUNFILE, "utf8") : "")
  .split("\n").map((l) => l.replace(/#.*/, "").trim()).filter(Boolean);

if (!nouns.length) {
  console.log("No domain nouns declared in domain-nouns.txt. Nothing to check.");
  process.exit(0);
}

const re = new RegExp(`\\b(${nouns.join("|")})\\b`, "i");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
  if (e.name === ".git" || e.name === "node_modules") return [];
  const p = path.join(d, e.name);
  return e.isDirectory() ? walk(p) : /\.(md|mjs|js|json|txt)$/.test(p) ? [p] : [];
});

const hits = [];
for (const f of walk(".")) {
  const rel = f.replace(/^\.\//, "");
  if (SELF.has(rel)) continue;
  const src = fs.readFileSync(f, "utf8").split("\n");
  src.forEach((text, i) => {
    const m = text.match(re);
    // Exemptions are explicit and counted (L17): the line carries its own marker and reason.
    if (m && !/\[law-exempt PURITY:/.test(text)) hits.push(`${rel}:${i + 1}  "${m[0]}"`);
  });
}

if (hits.length) {
  console.log(`DOMAIN LEAK — ${hits.length} occurrence(s). This repo has stopped being domain-agnostic:\n`);
  for (const h of hits) console.log("  " + h);
  process.exit(1);
}
console.log(`Domain-pure: ${nouns.length} noun(s) checked, zero occurrences.`);
