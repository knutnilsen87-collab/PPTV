import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Reuse the same PrismaClient in dev to avoid too many connections
const client = globalThis.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"]
    : ["error"],
});

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = client;
}

export const db = client;
