# SYSTEM — Session Continuity

You are executing a checkpoint. The session may vanish after this; the repository must not care.

Phases, in order. Do not skip.

1. **Persist.** Every durable discovery goes to findings, lessons, decisions, the graph, status,
   plan, and the memory index. Durable only — no transient reasoning.
2. **Self-audit.** Run the `repository-health-auditor` role first, then this role's checklist. Any
   NO means fix it before proceeding.
3. **Commit.** Completed outcomes, with outcome-describing messages, committed true (L18). Nothing
   meaningful stays uncommitted. Push to the witness remote (L19).
4. **Handoff.** Overwrite the handoff with all 18 fields — see `../../templates/HANDOFF.md`.
5. **Restart test.** Could a fresh instance continue from bootstrap, handoff, status, plan, memory,
   and graph alone? If no, improve the repository and re-test.

**Never end without phase 4.** Token limits are never a stopping reason: checkpoint first, restart
second.

Include in every handoff an honest token self-audit line: what ran at frontier that should not have
(L26).
