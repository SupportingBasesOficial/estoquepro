# PROJECT_RUNTIME_CONTRACT

## Purpose

This document defines the runtime guarantees that a project must bring from birth.

It exists so that the project does not depend on fragile human memory or improvised host-machine repair after problems appear.

---

## Runtime Guarantees

A project carrying this runtime base guarantees:

- assisted preparation of the current machine
- controlled installation of local dependencies when needed
- validation of the local runtime
- diagnostic visibility of the local environment
- VS Code task-based execution support

---

## Current Machine Principle

The project source of truth remains inside the project workspace.

Heavy host-machine-specific artifacts may be placed outside the portable project medium when this is necessary for performance, as long as the project remains controlled by its own scripts and policy.

---

## Operational Intent

The project must be able to:

1. prepare the machine
2. validate the machine
3. diagnose common environment problems
4. run development checks in a repeatable way

---

## Runtime Birth Artifacts

The runtime base of the project should include at minimum:

- `.vscode/tasks.json`
- `.vscode/settings.json`
- `scripts/prepare-current-machine.ps1`
- `scripts/validate-current-machine.ps1`
- `scripts/doctor.ps1`
- `PROJECT_RUNTIME_CONTRACT.md`
- `LOCAL_MACHINE_POLICY.md`

---

## Non-Goal

This contract does not define business logic, domain structure, or application architecture.

It defines only runtime birth guarantees.

---

## Final Rule

A project under SBOfficial should never need improvised post-problem runtime fixes if the runtime birth base was properly applied at birth.