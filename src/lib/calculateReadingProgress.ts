export function calculateReadingProgress(
  totalPages: number,
  readingSessions: { pagesRead: number }[]
): number {
  if (totalPages === 0 || readingSessions.length === 0) {
    return 0;
  }

  const pagesRead = readingSessions.reduce((sum, session) => sum + session.pagesRead, 0);

  return Math.min((pagesRead / totalPages) * 100, 100);
}