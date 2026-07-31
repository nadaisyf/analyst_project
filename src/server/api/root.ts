import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * The Book Tracker is built with Server Actions under /admin/books; tRPC is
 * kept installed but currently exposes no routers. Register new routers here
 * as needed.
 */
export const appRouter = createTRPCRouter({});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 */
export const createCaller = createCallerFactory(appRouter);
