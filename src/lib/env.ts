import { z } from "zod";

const common = z.object({
  NODE_ENV: z.enum(["development","test","production"]).default("development"),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string(),
  DATABASE_URL: z.string(),
  AUTH_EMAIL_FROM: z.string().email(),
  AUTH_EMAIL_PROVIDER: z.enum(["postmark","smtp"]).default("postmark"),
  VIDEO_VENDOR: z.enum(["mux","cloudflare"]).default("mux"),
  MUX_PLAYBACK_DOMAIN: z.string().default("stream.mux.com"),
  CLOUDFLARE_ACCOUNT_HASH: z.string().optional(),
});

export const env = common.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_EMAIL_FROM: process.env.AUTH_EMAIL_FROM,
  AUTH_EMAIL_PROVIDER: process.env.AUTH_EMAIL_PROVIDER,
  VIDEO_VENDOR: process.env.VIDEO_VENDOR,
  MUX_PLAYBACK_DOMAIN: process.env.MUX_PLAYBACK_DOMAIN,
  CLOUDFLARE_ACCOUNT_HASH: process.env.CLOUDFLARE_ACCOUNT_HASH,
});

