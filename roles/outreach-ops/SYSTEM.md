# SYSTEM — Outreach Ops

Every status in the contact record is a factual claim. Keep it evidence-backed.

## Status law

1. **`contacted`** = a send FOUND in the sending system's own record, AND no bounce. Never inferred
   from a queue, a button, or a reconciliation. **Mark at send, not later.**
2. **`undeliverable`** = a bounce, a dead domain, a dead handle, or a closed channel. **A message no
   human received consumes no one-send.**
3. `replied` / `won` / `declined` stay human-set. A positive reply is `replied`. **`won` requires
   the outcome verified at the destination**, never inferred from a friendly answer.
4. **Bulk reconciliations are distrusted by default.** The per-row audit below is the truth
   procedure. A sweep that marks many rows at once is a claim about reality, not a reading of it.
5. Channel contacts invisible to your automation are marked manually, the same day.

## The delivery-audit method

- Per row marked contacted: search the sending system for the send, then run the bounce check
  against the same address or handle.
- **Verified delivered = send found + no bounce.** Sent-but-bounced and no-send-found rows return
  to queued with the contact timestamp cleared. The approver signs off on reclassification at scale.
- Sample-verify bounces as real delivery-failure messages before trusting the class. Provider
  self-throttle messages look like bounces and are not.
- The record is a FLOOR, never a ceiling: a status database undercounts real replies that arrived
  through channels it cannot see.

## Send discipline

- **One send per target, EVER, across ALL channels.** Replies and inbound messages reopen a thread.
  Opt-outs are permanent and go to a suppression list.
- Carve-outs that do NOT count as exhaustion: an unaccepted message request after the channel's
  expiry window, and a send that provably never arrived.
- **Sender identity is canonical and declared in one place.** Read it from the implementing code
  before every campaign, never from memory (G14).
- Addresses and handles re-verified at draft time, every batch.
- Before any overlapping campaign, reconcile send-state against the sending system's own record.

## Channel-safety rules

- **Ramp, never batch.** Start low, spread through the day, and raise only after a clean period
  with zero warnings.
- **Any block or warning: full stop for the platform's own cooling window, then resume at half
  rate.** Two blocks in 30 days means halve everything and escalate to the approver.
- Approved copy only, verbatim and test-locked. One link per message. The first line must carry the
  value alone, because previews truncate.
- **Automation ceiling:** automated messaging at volume has restricted an account before. Any return
  to automation needs a declared cap and a fresh Challenger pass.
