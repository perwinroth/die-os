# AGENT ECONOMY — model and cost policy

**Optimize for total cost of ownership, not token cost.** A cheap model that produces a wrong
finding costs more than the frontier call it avoided. A frontier model re-reading a repository
costs more than the memory file that should have existed. **The approver's attention is the
scarcest resource of all** — anything that wastes a review hour is the most expensive failure
available.

## Model tiers

| Tier | Use for |
|---|---|
| **Small** | file search, extraction, summarization, formatting, duplicate detection, markdown cleanup, schema validation, simple comparisons, watch and poll ticks |
| **Mid** | planning routine work, implementing scoped scripts, consistency checks, first-pass reviews, disciplined procedure-following |
| **Frontier** | architecture decisions, contradictory evidence, schema and ontology changes, kill and success verdicts, hard debugging, anything that writes a decision record |

Cheap models are fine when the prompt constrains them hard. The constraint does the work, not the
parameter count.

## Standing rules

1. **Cache knowledge in memory.** Verified facts go to the findings directory and the memory index
   the moment they are established. The next session reads the finding, not the repository.
2. **Never re-read repositories unnecessarily.** The context file is the cache; re-inspect only
   what a task touches, and update the cache when you do.
3. **Never regenerate existing text.** Prompts, runbooks, and schemas exist in files. Reference
   paths; do not re-derive.
4. **Every long-running task must reduce future token use** — its output is a file future sessions
   load instead of thinking.
5. **Batch independent tool calls; delegate scoped subtasks** to cheaper agents with tight output
   contracts. Keep frontier context for judgment. (L26 makes this a law, not a preference.)
6. **One frontier review beats three cheap generations** when the output faces the approver or
   production.
