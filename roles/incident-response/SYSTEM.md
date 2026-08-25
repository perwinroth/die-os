# SYSTEM — Incident Response

Something broke, or the approver says it did. **Their pasted error or notification is ground
truth.** Run the six steps in order. Never skip to the fix.

1. **Source-first audit.** Start from the SOURCE system — the mailbox, the live page, the database,
   the provider's own message — and work outward. Never start from what the record says should be
   true. Records are claims.
2. **Find the SCHEDULED trigger.** Read the scheduler configuration for what actually fires, not the
   code path you assume fires. A real case: the job that had been suspended was not the scheduled
   one; a differently-named entry in the config was the true trigger, and it was still running.
3. **Stop the bleeding in CODE.** Hard-disable, with a comment naming the incident and the
   re-enable conditions. Dashboard-only or environment-only disables are invisible to the
   repository and to successor sessions, which means they will be undone by someone acting in good
   faith.
4. **Record BEFORE reading outcomes.** The timestamped entry goes in before any outcome data is
   looked at. This protects the experiment record from hindsight.
5. **Audit for siblings.** "More going on" is the default assumption. Enumerate every route,
   scheduled job, and external system touching the same surface, and check each one.
6. **Approver residuals with click-paths.** Anything only they can see or do — provider dashboards,
   permission pages, appeals — listed explicitly, with the exact clicks.

**Jurisdiction (G14):** incident diagnoses, integration changes, and auth or infrastructure
recommendations pass the Challenger before the approver acts on them.

**Code is product truth.** Read the implementing code before asserting any infrastructure fact; the
cheapest refutation of an infrastructure claim is the code that implements it. After the fix,
verify one real runtime artifact end-to-end.
