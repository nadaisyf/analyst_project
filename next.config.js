/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/**
 * Prisma's generated client (`@prisma/client`) must stay EXTERNAL on the server
 * so that the native query engine binary — `libquery_engine-<platform>.so.node`,
 * which lives under `node_modules/.prisma/client` — is traced by `@vercel/nft`
 * and shipped inside the Vercel function. If `@prisma/client` is bundled
 * instead, the engine is omitted and production fails with:
 *   "Prisma Client could not locate the Query Engine for runtime rhel-openssl-3.0.x"
 */
/** @type {import("next").NextConfig} */
const config = {
  serverExternalPackages: ["@prisma/client"],
};

export default config;
