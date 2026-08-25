# GATES — G1–G14

Every artifact that reaches the human approver, or the public, passes ALL applicable gates.
A failed gate means the item is fixed or rejected. It is never waved through.

Gates are domain-free by construction. Where a gate needs to know something about your project
— which dataset is read-only, which claims need deterministic backing — it reads it from your
`DOMAIN.md`, never from this file.

| # | Gate | Check |
|---|---|---|
| G1 | **No unsupported claims** | Every factual statement cites a specific input line (a data field, a query, a source signal) in `evidence_cited`. |
| G2 | **Objective properties need deterministic evidence** | A claim about a verifiable property of a thing requires that property in the canonical dataset. An inferred or review-derived mention alone is insufficient. Your `DOMAIN.md` names which properties are hard. |
| G3 | **No mutation of canonical truth** | Nothing writes to the canonical dataset or any scoring artifact derived from it. Structural, not procedural: the mechanism is overrides only. |
| G4 | **No overpromising** | The snippet, subject line, or summary promises only what the destination delivers. Downstream guardrails exist to catch what this misses; the gate comes first. |
| G5 | **No truth contradiction** | A claim must not contradict any field of the canonical record it describes. |
| G6 | **Rollback exists** | Every change records prior state and its reversal path *before* application. No rollback, no application. |
| G7 | **No writes to the production repository** | The OS repository produces recommendations. Only the human applies them, explicitly, in their own workflow. |
| G8 | **No architecture without evidence** | New tables, services, repositories, or abstractions require a measured outcome or a named blocker they remove, recorded as a decision. |
| G9 | **No permanent automation until the manual loop proves value** | Crons, daemons, auto-apply, and agents-on-schedule wait until the manual version has demonstrated the value they would scale. Automating an unproven loop scales a guess. |
| G10 | **No session ends without a checkpoint** | Health audit run, durable knowledge persisted, outcomes committed, handoff overwritten, restart test passed. A session that ends without a handoff is a defect, not a stopping point. |
| G11 | **Demand evidence precedes supply evidence** | Every signal carries `demand_evidence: direct \| proxy \| none`. Recommendations require `direct` (a real person asked for this) or strong `proxy` (a demand-optimizing platform invests in the surface). `none` — your own copy, editorial, data you happen to hold — generates hypotheses and harvest tasks, never recommendations. **Data availability is not demand.** |
| G12 | **The trace chain must be demonstrable** | Every recommendation walks: Human Evidence → Achievement Hypothesis → Business Mapping → Gap Analysis → Response Portfolio → Experiment → Learning. Chain broken means no recommendation. High uncertainty means "we do not know yet" plus hypotheses plus a validation plan. An opportunity requires MULTIPLE achievement hypotheses, not one belief restated. |
| G13 | **Hyper-relevance / the doorway test** | Nothing ships, or stays shipped, unless (a) it is **more useful to the person who arrived than the destination it points at** — something neither the destination nor an aggregator provides — and (b) it fails every item on the thin-content anti-checklist: no copied text, no template with one variable swapped, no excessive monetization density, no stock-only assets, visible methodology and first-hand signal. Surface compliance does not pass: disclaimer-sprinkling and boilerplate "methodology" links are cosmetics, and the bar is hyper-relevance. Scaled or templated rollout without per-item unique value is frozen by default. |
| G14 | **Integration truth precedes integration change** | No change to a live integration (sending identity, auth and tokens, scheduled jobs, database writes, third-party APIs) ships unless: (a) the implementing code has been read end-to-end in-session and the change is reconciled with what that code already declares — **the code IS product truth**; (b) every account or infrastructure fact the change relies on is read from code, or verified with the human in-session, never recalled or assumed; (c) the DIAGNOSIS and the change both pass a Challenger review — operational and incident work is inside the adversarial panel's jurisdiction, not just new proposals; (d) one real end-to-end runtime verification runs after, and where possible before, the change. |

## The incidents behind the two hardest gates

Gates are not opinions. G13 and G14 are the two that get argued with, so their grounding stays
attached.

**G14.** A mail-sending module pinned an account identity taken from a hallucinated fact, while
the actual mail library plainly declared a *different* sending identity two files away. Nobody
read it. The error burned an entire experiment wave (n=15, a pre-registration deviation),
forced the human into auth churn, and passed no adversarial review. The "incident fix" that
followed then repaired a defect the system itself had introduced, and a further **unverified**
auth change was recommended the same day before the human stopped it. A second case the same
week: a notification "restoration" rebuilt an integration from scratch without reading the
existing script that already implemented it — in the repository, in plain sight — forcing the
human to disable their own working trigger.

"Implementing code" includes scripts, externally-hosted sources, and configs checked into the
repository. Where an implementation lives outside the repository, its behaviour is a fact to be
verified with the human, never an assumption.

**The rule this produced: the system must never break an integration that worked before it arrived.**

**G13.** Templated rollout at scale is the cheapest thing an automated system can do and the
fastest way to become the thing search engines and readers are trying to filter out. The gate
exists because compliance theatre — adding a disclaimer, linking a methodology page — reads as
passing while changing nothing about whether the page deserves to exist.

## How gates run

Manually, as a checklist, at two points: after generation, when the session self-checks every
item before presenting it; and at human review, where the review checklist embeds them. Gate
results are recorded per item.

## Jurisdiction

**The gates govern every human-facing or public-facing artifact, not only the primary output
type.** A story, a pitch, a report page, a forum answer — each is a Response, and each passes
G1 (verbatim evidence), G11 (*whose* demand? "data we happen to have is not demand" applies to
stories too), G12 and G13 before review.

**And nothing human-facing skips the Challenger.** An adversarial pass runs before the human's,
always. The approver's minutes are the scarcest resource in the system and must never be the
first-line filter.

Root cause on record: three supply-side angles reached the approver unchallenged and were killed
by hand. The reframe that fixed it — run the loop on every audience the business must be
discovered *by*, not only its end users — had to come from the human, which is exactly the
failure this jurisdiction clause prevents.
