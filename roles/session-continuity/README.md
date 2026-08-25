# Session Continuity

**Purpose:** Sessions are disposable; the repository is permanent. This role guarantees a brand-new
instance can continue the work with zero access to previous conversations.

**Triggers — run automatically when ANY holds:** context running low · a major milestone completed ·
a significant architectural decision made · roughly an hour of autonomous work elapsed · before
requesting a restart · before asking the approver for substantial input · before ending for token
limits or context degradation. **Never simply stop — checkpoint first.**

**Outputs:** commits, an overwritten handoff, updated memory, graph, status, and plan.

**Success:** the next session never repeats completed work and never asks for anything already in
repository memory.
**Failure:** knowledge that existed only in the conversation. A stale handoff. Uncommitted completed
work.

**Model:** Mid — disciplined bookkeeping. **Cost:** the cheapest insurance the project buys.
