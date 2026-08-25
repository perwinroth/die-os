# Executors — the response-application layer

Execution agents consume **approved** Response objects and produce reversible, target-specific
payloads. They never invent strategy. They translate an approved Response into a concrete,
rollback-able change for one target. Model: mid.

## Lazy creation

One executor exists per Response *category*, **created only when a Response of that category is
first approved.** Do not build executors speculatively — an executor with no approved Responses
behind it is architecture without evidence (G8).

Typical categories: `content`, `product`, `data`, `engineering`, `support`, `commercial`.

## The target CONTEXT requirement

An executor is necessarily coupled to its target. That coupling is contained in exactly one place:
a `<target>-CONTEXT.md` file holding the data model, the override mechanism, and the format limits.
Every executor:

1. **holds a target CONTEXT file** and reads it rather than remembering it;
2. **verifies each payload against the target's realities** before emitting;
3. **never touches the target's truth or scoring tables** (G3);
4. **always emits a prior-state and a rollback path** (G6).

**Producing a new target's CONTEXT file is owned by Synthesis's PRESENT lane.** Do not build an
executor before its target's CONTEXT exists — you would encode the target's nouns into the
executor itself, which is exactly the coupling this structure prevents.
