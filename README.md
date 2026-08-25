# DIE-OS — the domain-agnostic operating system

A way of working, not a project. Nothing in this repository knows what you are building.

It contains three things and nothing else:

- **`roles/`** — 14 constrained expert roles. Each is a reusable asset, not a persona: its
  `SYSTEM.md` is the operating prompt, its `CHECKLIST.md` gates its output, its `MEMORY.md`
  accumulates that role's lessons *in your project*.
- **`GATES.md`** — G1–G14, the checks every artifact passes before a human is asked to approve it.
- **`LAWS.md`** — the standing conduct laws, append-only, each naming the defect that caused it.

Plus `AGENT_ECONOMY.md` (which model tier does what), `BOOTSTRAP.md` (the session loop), and
`scripts/check-laws.mjs` (the mechanical checker, because prose decays and scripts do not).

## Why these three

Roles keep work in lane. Gates keep unsupported work away from the human. Laws keep the
system from re-making a mistake it already paid for. Everything else — what you measure, what
you sell, who your users are — is a **domain pack** that lives in your own repository and never
in this one.

## Adopting it in a project

1. Copy or submodule this repo into your project as `os/`.
2. Write **one** file of your own: `DOMAIN.md`. It names the target product, the canonical
   dataset that is read-only, the human approver, and any gates your domain adds. That file is
   the only place a domain noun is allowed to appear.
3. Point your `CLAUDE.md` (or equivalent) at `os/BOOTSTRAP.md`, then `DOMAIN.md`.
4. Give each role a `MEMORY.md` in your project, not here. Role memory is domain knowledge.

Two projects sharing this repo should be able to swap it wholesale and notice nothing.

## The one test this repo must pass

```
node scripts/check-domain-purity.mjs
```

It greps every file here for the nouns declared in `domain-nouns.txt` and exits non-zero on a
hit. Empty output, or the repo has stopped being what it claims to be. Add your project's nouns
to that file when you vendor this repo, so the check keeps working as your domain grows.

## Lineage

Extracted 2026-08-25 from the private project it grew inside, where every role, gate, and law below
was earned by a live failure. The incidents are preserved in each law's grounding, stripped of
the domain nouns they happened to occur in. A law with no incident behind it is a preference,
and preferences do not belong here.
