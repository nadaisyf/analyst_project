# Project Context

## Purpose

Build a personal book tracking web application where users can organize, track, and review the books they read.

## Target Users

People who enjoy reading and want an easy way to manage their personal library and reading progress.

## Stack

- Frontend: Next.js (App Router) + TypeScript
- Backend: tRPC / Next API routes
- DB: PostgreSQL + Prisma
- Auth: Auth.js (NextAuth v5)
- Deploy: Vercel

## Success Criteria

The MVP is complete when users can:

- Sign in securely
- Add books to their library
- Update reading status (Want to Read, Reading, Finished)
- Rate and review books
- View their personal book collection

## Authentication

### Providers

- Auth.js (NextAuth v5)
- Credentials Provider (email/password)
- Discord Provider

### Configuration

Authentication is configured in:

- `src/server/auth/config.ts`

Auth helpers are exposed from:

- `src/server/auth/index.ts`

### Session

- Server pages retrieve the authenticated user through `getSession()`.
- `/dashboard` is protected by middleware and also performs a server-side session check.

### Security

- Passwords are hashed using `bcrypt.hash(password, 12)` before being stored.
- Email addresses are normalized to lowercase before lookup and storage.

### Architecture

- Authentication providers are isolated in the server layer.
- UI components never import authentication providers directly.
- Client components interact with authentication only through server actions and the session abstraction (`getSession()`), following the Liskov Substitution Principle.

## Data Models

### User

Represents the owner of the book tracker.

**Fields**

- id
- name
- email
- emailVerified
- image
- passwordHash (hashed with bcrypt)

**Relations**

- Has many Books
- Has many Accounts
- Has many Sessions

### Book

Represents a book in the user's personal library.

**Fields**

- id
- title
- author
- totalPages
- readingStatus (UNREAD, READING, FINISHED)
- createdAt
- updatedAt

**Relations**

- Belongs to User
- Has many ReadingSessions

### ReadingSession

Represents a single reading session for a book.

**Fields**

- id
- sessionDate
- pagesRead
- note
- createdAt
- updatedAt

**Relations**

- Belongs to Book

## Testing

### Testing Framework

- Vitest

### How to Run Tests

Run all tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Test Location

Current unit tests are stored in:

```
src/lib/
```

### Current Test Coverage

Current tests cover the core business logic:

- calculateReadingProgress()
- Empty reading sessions
- Zero total pages
- Single reading session
- Multiple reading sessions
- Progress capped at 100%
- Duplicate reading sessions

Current coverage:

- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

### Future Testing

Planned additions:

- Integration tests for Book Tracker API endpoints
- Authentication flow tests
- End-to-end tests using Playwright
