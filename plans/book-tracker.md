---
type: Plan
title: Book Tracker, data layer
description: Define the 3 core entities and their relations before any UI.
tags: [schema, mvp, week-1]
---

# Goal

One sentence describing what the MVP does.

# Entities

- User: owns everything.
- Book: belongs to a User and stores information about a book(title, author, reading status, etc.).
- ReadingSession: belong to a Book and records each reading activity, including the date, pages read, and optional notes.

# Relations

User 1, many Book; Book 1, ReadingSession.

# Out of Scope (this pass)

- UI (none this week).
- Reading statistics and charts.
- Book recommendations.
- Authentication (added in Week 3).

# Open Questions

- Should book authors be stored as plain text or as a separate Author model?
- Should reading progress be calculated from ReadingSession or stored directly in the Book model?
- How should total pages be handled if a user reads different editions of the same book?

# Done Look Like

- The 3 entities exist as Prisma models with explicit relations.
- 'prisma migrate dev' runs clean.
  Prisma Studio shows the tables and I can insert test data manually.
