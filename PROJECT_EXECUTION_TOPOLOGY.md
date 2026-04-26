# PROJECT_EXECUTION_TOPOLOGY

## Purpose

This document defines the execution topology of the project.

It exists to prevent ambiguity about where the project is governed, where it is executed, and how synchronization is supposed to happen.

A serious project must not depend on hidden human interpretation of where code should be installed, tested, or run.

---

## Core Principle

A project may have more than one operational location, but each location must have an explicit role.

The project must always declare:

- portable workspace role
- remote repository role
- execution clone role
- synchronization path
- active implementation location

---

## Standard Topology

The standard SBOfficial execution topology is:

- portable workspace
- remote Git repository
- local execution clone

### Portable Workspace

The portable workspace exists to carry:

- doctrine-related project records
- project governance artifacts
- portable copy of the project
- factory compatibility
- strategic continuity

### Remote Repository

The remote repository exists to provide:

- official synchronization
- history
- backup
- branch coordination
- safe propagation between environments

### Local Execution Clone

The local execution clone exists to provide:

- dependency installation
- typecheck
- tests
- runtime execution
- implementation flow on a performant host filesystem

---

## Active Implementation Rule

When a project uses an execution clone, code implementation must happen in the execution clone, not directly inside the portable workspace.

The portable workspace remains valuable, but it is not the active execution location when the topology explicitly defines a local execution clone.

---

## Synchronization Rule

Synchronization must happen through Git as the primary mechanism.

The intended flow is:

1. portable project is versioned
2. remote repository becomes official synchronization point
3. local execution clone pulls from remote
4. implementation happens in the local execution clone
5. changes are committed and pushed
6. portable workspace may pull updates when needed

---

## Non-Goal

This topology does not define business logic or technical architecture.

It defines execution geography and operational responsibility.

---

## Final Rule

A project is not operationally mature if its execution topology is implicit.

Execution location, portable location, and synchronization path must be explicitly declared from birth.