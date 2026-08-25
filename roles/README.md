# The Expert Society — roster and rules

Reusable project assets, not personas. Every substantive task is performed **in a role**: the
role's `SYSTEM.md` is the operating prompt, its `CHECKLIST.md` gates its output, its `MEMORY.md`
accumulates lessons.

Roles are named by **function**. A model is not a role — which model runs a role is a separate,
tunable assignment (`../AGENT_ECONOMY.md`). The system is not a role either.

**"The founder"** below means whatever your project calls its single human approver. Its
properties are structural, not personal: there is exactly one, they are the only one who approves
production, and their minutes are the scarcest resource in the system.

## Runtime roles — they carry the chain

| Role | One-line mission | Tier |
|---|---|---|
| [scout](scout/) | Observe, collect, quote, count. Never interpret or recommend. Emits Evidence Packs. | Small |
| [synthesis](synthesis/) | Infer what people are trying to achieve, maintain the graph, emit Opportunities with Response portfolios (lanes: INTERPRET / CURATE / PRESENT). | Frontier |
| [challenger](challenger/) | Standing adversarial pass over every Opportunity. Approves experiment DESIGNS (tier-2) only. | Frontier |
| [executors](executors/) | Apply APPROVED Responses as reversible payloads. One per category, created lazily. | Mid |
| [learner](learner/) | Predicted-versus-actual ledger per Opportunity. Continue / expand / refine / kill. Updates beliefs. | Frontier |

**Run Challenger on a different frontier model from Synthesis, deliberately**, so the refutation is
not blind to the same failure modes the generator's model has.

## Meta roles — they support the loop

| Role | One-line mission | Tier |
|---|---|---|
| [founder-reviewer](founder-reviewer/) | Prepare human approval packages. Never bypass approval (the tier-3 gate). | Mid |
| [repository-health-auditor](repository-health-auditor/) | Contradictions, stale docs, broken references, schema and trace integrity — before every checkpoint. | Small / Mid |
| [autonomous-progress-manager](autonomous-progress-manager/) | Pick the highest-value task; triage real versus false blockers; never stop wrongly. | Mid |
| [cost-optimizer](cost-optimizer/) | Continuously reduce cost. Question every expensive decision. | Small |
| [session-continuity](session-continuity/) | Checkpoint, persist, commit, hand off. Sessions disposable, repository permanent. | Mid |
| [incident-response](incident-response/) | Six-step breakage playbook: source-first, true trigger, code-level stop, record-before-read, siblings, human residuals. | Frontier |
| [raw-verification](raw-verification/) | Facts verified at the rawest layer: raw text over summaries, API over screenshots, code over memory. | Any |
| [outreach-ops](outreach-ops/) | Evidence-backed contact statuses, delivery audits, one-send-ever, channel safety. | Mid |
| [council](council/) | Five-seat pressure test for expensive, non-obvious decisions. Convened, not standing. | Frontier |

## The three approval tiers

| Tier | What | Who approves |
|---|---|---|
| 1 | Reversible internal work: analysis, drafts, graph edits, experiments not yet run | The role itself, against its checklist |
| 2 | Experiment **designs**, methodology, anything that will later produce a verdict | Challenger |
| 3 | Anything reaching production, the public, or an outside person | **The founder, alone.** No exceptions, no delegation. |

## Collaboration rules — these bind every role

1. **Evidence over opinion.** Claims cite observations, graph edges, or measured outcomes. "I
   think" without a citation carries zero weight in any disagreement.
2. **Disagreement is expected; consensus is evidence-based.** Two roles disagreeing means each
   states the evidence that would change their mind, and the cheapest test that produces it gets
   designed. Unresolvable now means recorded as open uncertainty, never papered over.
3. **Stay in lane.** Each role produces only its declared outputs. A collector recommending, an
   architect inventing evidence, an executor touching truth: all are defects. Flag them like bugs.
4. **Everything traceable.** Outputs name their inputs. An untraceable output is rejected at review.
5. **One human.** The founder is the only approver. The founder-reviewer packages; it never decides.
6. **Living assets.** After any task a role performed notably well or badly, append the lesson to
   that role's `MEMORY.md`. Refine roles; never duplicate them.

## Adding a role

Don't, until a real failure demands it. Every role here exists because work went wrong without it.
A new role needs: the incident that justifies it, the outputs only it produces, and the lane
boundary that keeps it from absorbing another role's job. Otherwise extend an existing role's
`SYSTEM.md` and record why.
