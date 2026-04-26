# WORKING_COPY_POLICY

## Purpose

This document defines how the working copy of a project should be treated when the project uses a portable workspace and a local execution clone.

---

## Core Policy

The working copy used for implementation must be explicitly identified.

There must never be ambiguity about which copy is:

- portable reference
- active execution copy
- synchronization source
- synchronization destination

---

## Default Policy

### Portable Workspace

The portable workspace is:

- strategic
- portable
- governance-compatible
- factory-compatible
- useful as a mirrored local reference

It is not the preferred location for heavy dependency installation when the portable medium is weak.

### Local Execution Clone

The local execution clone is:

- the active location for implementation
- the preferred location for dependency installation
- the preferred location for typecheck
- the preferred location for tests
- the preferred location for local runtime execution

### Remote Repository

The remote repository is:

- the official synchronization backbone
- the canonical exchange point between copies

---

## Active Copy Rule

If a local execution clone exists and is declared active, implementation must happen there.

The portable copy must not be treated as the active implementation copy at the same time.

---

## Sync Rule

The intended sync flow is:

- portable copy initializes or mirrors the project
- remote repository receives official pushes
- execution clone pulls and works
- portable copy updates by pull, not by manual uncontrolled drift

---

## Forbidden Pattern

The following pattern is forbidden:

- editing in the portable copy
- also editing in the execution clone
- without explicit sync discipline

This creates copy divergence and destroys operational clarity.

---

## Operational Meaning

A project may be portable and executable, but not in the same place at the same time for the same purpose.

One copy may be portable.
Another may be active for execution.

That distinction must remain explicit.

---

## Final Rule

A serious project must always know which copy is active for code work.