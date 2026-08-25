# BOOTSTRAP — the session loop

Read this, then your project's `DOMAIN.md`. This file never names your domain; that one never
names the process.

## Every session

1. **Register on the session board.** Append your row to the project's session log: what you are
   working on, which files and areas you claim. Check it BEFORE editing anything shared. Mandatory —
   parallel sessions editing the same file have broken a production build.
2. **Load the operating system:** `LAWS.md` → `GATES.md` → `AGENT_ECONOMY.md`.
3. **Load project memory:** the memory index, current status, current plan.
4. **Load the roles:** `roles/README.md`. All substantive work happens in a role. Its `SYSTEM.md`
   is your operating prompt; its `CHECKLIST.md` gates your output; its `MEMORY.md` receives lessons.
5. **Inventory your tools.** Diff what is actually connected against what the project's registry
   claims, and update the registry.
6. **Collect evidence** for the active subject. A standing step, not an on-request one.
7. **Update the knowledge graph** with fused observations.
8. **Determine the highest-value next action** (project priority order × current status).
9. **Execute unblocked work** without asking.
10. **Commit.**
11. **Repeat from 6** while unblocked work remains.

## Session continuity (mandatory)

Sessions are disposable; the repository is permanent. On ANY checkpoint trigger — context running
low, a milestone done, an architectural decision made, roughly an hour of autonomous work, before a
restart, before a substantial question to the approver, or any ending — run the
`repository-health-auditor` role, then the `session-continuity` role: persist durable knowledge,
self-audit, commit outcomes, overwrite the handoff, verify restart readiness.

**Never simply stop; checkpoint first.** Token limits are never a stopping reason: checkpoint
first, restart second.

**Context economy:** repository memory is cheaper than conversation memory. When repository state
is sufficient, prefer ending with a clean checkpoint and resuming fresh over consuming more
context. Always prefer repository knowledge over conversation history.

## The autonomous continuation rule

Observe → Learn → Update Memory → Update Graph → Generate Recommendation → Execute → Validate →
Commit → Repeat.

Stopping is exceptional; continuing is the default. After every task ask: **can I continue without
approver input?** If yes, continue. Do not ask "should I continue?"

Stop only when:
- external data requires credentials unavailable to you,
- a production change requires approval,
- a destructive change is required,
- the approver must choose between materially different strategies,
- or all available work is complete and review is required.

**A thin signal is not a blocker.** If the measurement you wanted is unavailable, switch
automatically to the validation ladder: collect context → extract signals → match against truth →
generate recommendations → update the graph → prepare treatment and control groups → stop only
before production changes.

## The architecture in one breath

Context ALWAYS precedes Truth:

> Reality → Sources → Context → Evidence Fusion → Knowledge Graph → Truth Matching →
> Recommendation Engine → Presentation → Measurement → Learning

Truth satisfies demand; it never defines it. **The objective is not to optimize the output surface.
The objective is to improve the knowledge graph. The output surface is only one consumer of it.**

## Hard boundaries

Your `DOMAIN.md` fills in the specifics. The shapes are fixed:

- **The production repository is read-only**, always, unless the approver explicitly asks for an
  implementation change inside it. They apply approved changes through their own workflow.
- **The canonical dataset is never modified** by anything this system produces (G3).
- **Nothing reaches production without approval** (G7, and the tier-3 gate in `roles/README.md`).
- **This repository is the only place the system writes and commits.**
