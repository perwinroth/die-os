# DOMAIN — <project name>

**The only file in which a domain noun is allowed to appear.** Everything in `os/` is generic;
everything specific to what you are building lives here or in your own project files.

Copy this to `DOMAIN.md` in your project root and fill it in.

## The target

- **Product / system this serves:**
- **Production repository (read-only to the OS):**
- **How approved changes actually get applied:**

## Canonical truth

- **The canonical dataset (never modified — G3):**
- **The scoring or derived artifacts that are also never modified:**
- **Which properties are "hard" and require deterministic evidence (G2):**

## The approver

- **Who:**
- **What they alone approve (tier-3):**
- **Their time budget per item:**

## Surfaces

- **Reader-facing copy** (the L9 copy law applies):
- **Copy-paste surfaces** (plain prose only, no markdown):
- **Public surfaces** (G13 applies):

Mirror these into `check-laws.config.json` so the checker enforces them:

```json
{
  "readerFacing": [],
  "plainSurfaces": [],
  "domainNouns": []
}
```

## Domain gates

Gates your domain adds on top of G1–G14. Each names the incident that caused it, or it is a
preference and does not belong here.

| # | Gate | Check | Incident |
|---|---|---|---|
| | | | |

## Domain laws

Laws your domain adds on top of the conduct laws. Same rule: name the correction that caused it.
Measurement laws in particular are domain-bound and belong here, not in the OS.

## Controls

Anything declared untouchable — control groups, holdout sets, frozen baselines. Name each one and
what breaks if it is touched.

## The bar (L99)

The numeric bar below which this project's output is a work in progress, and is described that way.
