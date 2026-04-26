# LOCAL_MACHINE_POLICY

## Purpose

This file defines how the project may use the current machine during development.

It exists to make local-machine usage explicit, controlled, and reproducible.

---

## Core Policy

The project workspace remains the source of truth.

When necessary for performance, heavy dependency caches may live on the local machine outside the portable workspace medium.

This is allowed only when the project remains governed by its own runtime scripts and runtime documents.

---

## Allowed Local Usage

The project may use the current machine for:

- dependency cache
- local runtime support
- local execution of development commands
- validation commands
- temporary machine-specific operational support

---

## Not Allowed

The project should not depend on undocumented manual host-machine fixes.

The project should not require the user to remember hidden setup steps outside project scripts and runtime documents.

The project should not rely on silent machine-specific behavior that cannot be reproduced by another authorized setup.

---

## Expected Behavior

The project should prepare the machine through its own runtime scripts.

The project should validate the machine through its own validation scripts.

The project should diagnose its own environment through its own diagnostic scripts.

The project should declare where local heavy artifacts may live when needed.

---

## Performance Principle

When the portable workspace medium is too weak for heavy dependency storage, the project may place dependency caches on the current machine while keeping:

- source code in the project workspace
- operational control inside the project runtime scripts
- runtime governance inside project runtime documents

---

## Final Rule

The current machine may support the project, but the project must remain operationally governed by its own runtime contract and local machine policy.