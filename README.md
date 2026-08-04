# Book Tracker

## Overview

Book Tracker is a web application that helps users organize and manage their personal reading list. Users can create an account, add books, update their reading status, and keep track of their reading journey in one place.

## Tech Stack

This project is built with the T3 Stack because it provides end-to-end type safety, a modern development workflow, and an excellent developer experience.

Technologies used:

- Next.js (App Router)
- TypeScript
- Prisma
- PostgreSQL
- Tailwind CSS
- NextAuth
- tRPC
- Vitest
- Playwright
- GitHub Actions
- Vercel

## Running Locally

Clone the repository:

```bash
git clone https://github.com/nadaisyf/analyst_project.git
cd analyst_project
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure the required environment variables.

Run the database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Then open:

```
http://localhost:3000
```

## Running Tests

### Unit Tests

```bash
npm test
```

or

```bash
npm run test
```

### End-to-End Tests

```bash
npx playwright test
```

To view the Playwright report:

```bash
npx playwright show-report
```

## Environment Variables

Create a `.env` file in the project root with the following variables:

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

## Database

The Prisma schema is located in:

```
prisma/schema.prisma
```

Run migrations whenever the schema changes:

```bash
npx prisma migrate dev
```

## Known Limitations

- Search and filtering are not available yet.
- Reading statistics have not been implemented.
- Reading progress tracking is not available yet.

## Future Improvements

- Reading progress tracking
- Search and filtering
- Reading statistics dashboard
- Book cover uploads
- Dark mode
- API rate limiting

## Author

Developed by **Nadaisyf**.
