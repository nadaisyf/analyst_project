/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import { readFileSync } from "node:fs";

// Prisma 6 generates the client into `/generated/prisma` under a hashed
// package name (derived from the schema), with the native query engine
// (`libquery_engine-<platform>.so.node`) placed alongside the generated JS.
// Next.js must treat this client as an EXTERNAL server package so that, on
// Vercel, `@vercel/nft` traces and ships the engine binary and the client can
// locate the engine from its own directory (`__dirname`) at runtime.
//
// Without this the bundler omits the `.node` engine and production fails with:
//   "Prisma Client could not locate the Query Engine for runtime rhel-openssl-3.0.x"
//
// The name is read dynamically because Prisma regenerates it whenever the
// schema changes; hardcoding it would silently break on the next migration.
function readPrismaClientName() {
  try {
    const pkg = JSON.parse(
      readFileSync(
        new URL("./generated/prisma/package.json", import.meta.url),
        "utf8",
      ),
    );
    return typeof pkg.name === "string" ? pkg.name : undefined;
  } catch {
    // `generated/prisma` may not exist yet (e.g. before `prisma generate`).
    return undefined;
  }
}

const prismaClientName = readPrismaClientName();

/** @type {import("next").NextConfig} */
const config = {
  serverExternalPackages: prismaClientName ? [prismaClientName] : [],
};

export default config;
