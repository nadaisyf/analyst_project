# Prompt Library

## Week 1 — Schema Design

### Prompt

Design the Prisma schema for this feature before writing any implementation.
List the entities, fields, relationships, and explain why each model exists.
Do not write implementation until the schema is approved.

### Purpose

Used before implementing a new feature to avoid creating incorrect database models.

---

## Week 2 — Tests First

### Prompt

Write the failing tests first.
Run the tests.
Implement the smallest amount of code required to make the tests pass.
Do not write production code before the tests exist.

### Purpose

Encourages Test-Driven Development (TDD) and prevents implementing unnecessary code before requirements are verified.

---

## Week 3 — Senior Engineer Review

### Prompt

Review this diff as a senior engineer.
Flag correctness, edge cases, security, unclear code, performance.
Be specific with file names and line numbers.

### Purpose

Identify bugs, security issues, edge cases, and code quality problems before committing.

---

# What Didn't Work

## Asking the AI to build an entire feature in one prompt

Result:

- Difficult to review
- Too many unrelated changes

## Starting implementation before designing the schema

Result:

- The AI tended to invent models and relationships.

## Requesting implementation without providing context.md

Result:

- The AI guessed table names, endpoints, and architecture.
