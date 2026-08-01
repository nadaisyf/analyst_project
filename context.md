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

## API Surface

### Authentication

- getSession()
  - Input: None
  - Output: Current authenticated session or null
  - Auth required: No

### Admin Books

- GET /admin/books
  - Purpose: Display all books belonging to the authenticated user.
  - Auth required: Yes

- GET /admin/books/new
  - Purpose: Display the form to create a new book.
  - Auth required: Yes

- POST createBook()
  - Input: title, author, totalPages, readingStatus
  - Output: BookActionResult
  - Auth required: Yes

- POST updateBook(id)
  - Input: book id + updated book data
  - Output: BookActionResult
  - Auth required: Yes

- POST deleteBook(id)
  - Input: book id
  - Output: BookActionResult
  - Auth required: Yes

- GET /admin/books/[id]/edit
  - Purpose: Display the edit form for a user's book.
  - Auth required: Yes

## Security Notes

### Dependency Audit (2026-07-30)

Executed:

```bash
npm audit
```

Result:

- 3 Critical vulnerabilities
- 16 High vulnerabilities

Main affected packages:

- next-auth (@auth/core)
- next
- sharp
- bcrypt
- eslint ecosystem

The available automatic fix requires:

```bash
npm audit fix --force
```

However, this would upgrade multiple major dependencies (NextAuth, Next.js, bcrypt, ESLint), which may introduce breaking changes.

Following the project guidelines, these upgrades have been postponed until compatibility testing can be completed.

The project CI pipeline will continue running `npm audit` so dependency vulnerabilities remain visible until they are safely resolved.

## Security & CI

### CI Pipeline

This project uses GitHub Actions for Continuous Integration.

Workflow location:

.github/workflows/ci.yml

Every Pull Request and push to `main` automatically runs:

- ESLint
- TypeScript type checking
- Unit tests with coverage
- npm audit (High severity)
- Production build

A merge is blocked if any required check fails.

---

### Branch Protection

The `main` branch is protected using GitHub Branch Protection Rules.

Enabled protections:

- Require status checks to pass before merging
- Require branches to be up to date before merging
- Require at least one Pull Request review
- CI (`gate`) must pass before merge

Developers should never merge code while CI is failing.

---

### Secrets Management

All sensitive credentials are stored as GitHub Secrets.

Current secrets include:

- AUTH_SECRET
- AUTH_DISCORD_ID
- AUTH_DISCORD_SECRET
- DATABASE_URL

No secrets are committed to the repository.

---

### Secret Rotation

If a secret is exposed:

1. Generate a new secret.
2. Replace the value in GitHub Secrets.
3. Update the deployment platform (Vercel).
4. Redeploy the application.
5. Invalidate the old credential.

Secrets should be rotated immediately after any suspected exposure.
