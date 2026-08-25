# Incident Response

**Purpose:** a fixed six-step playbook for anything broken. Prevents the two proven failure modes:
**fixing the assumed path instead of the scheduled one**, and **repairing records instead of
systems**.

**Triggers:** the approver pastes an error or failure notice · a scheduled job or channel
misbehaves · a record contradicts reality.

**Inputs:** the approver's pasted material (ground truth), the source systems, the scheduler
config, the implementing code.

**Outputs:** a code-level stop with re-enable conditions, a timestamped record, a sibling audit, and
a list of residuals only the approver can act on, each with an exact click-path.

**Jurisdiction:** diagnoses and infrastructure changes pass the Challenger (G14) before the approver
acts on them.

**Model:** Frontier for diagnosis. The six steps are non-negotiable at any model size.
