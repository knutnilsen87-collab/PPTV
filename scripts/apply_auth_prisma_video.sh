#!/usr/bin/env bash
set -euo pipefail

# ProPokerTV — Apply Auth (Email) + Prisma models/seed + Video player abstraction
# Supports Postmark OR SMTP for magic links, and Mux OR Cloudflare Stream for HLS playback.
# Usage (from project root):
#   bash scripts/apply_auth_prisma_video.sh --provider postmark --video mux
#   bash scripts/apply_auth_prisma_video.sh --provider smtp     --video cloudflare
#
# Afterwards:
#   pnpm install  (or npm/yarn)
#   npx prisma generate
#   npx prisma migrate dev --name init
#   pnpm db:seed
#   pnpm dev

PROVIDER="postmark"     # postmark|smtp
VIDEO="mux"             # mux|cloudflare

while [[ $# -gt 0 ]]; do
  case "$1" in
    --provider) PROVIDER="$2"; shift 2;;
    --video) VIDEO="$2"; shift 2;;
    *) echo "Unknown arg: $1"; exit 1;;
  esac
done

TS=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=".backup_auth_$TS"
backup_if_exists(){ local f="$1"; [ -e "$f" ] || return 0; mkdir -p "$BACKUP_DIR/$(dirname "$f")"; mv "$f" "$BACKUP_DIR/$f"; echo "  ↪ backed up $f"; }
write(){ local path="$1"; shift; mkdir -p "$(dirname "$path")"; backup_if_exists "$path"; printf "%s\n" "$CONTENT" > "$path"; echo "  ✓ wrote $path"; }
append(){ local path="$1"; shift; mkdir -p "$(dirname "$path")"; touch "$path"; printf "%s\n" "$CONTENT" >> "$path"; echo "  ➕ appended $path"; }
req_dir(){ [ -d src ] || { echo "Run this from the project root (missing src/)."; exit 1; } }

req_dir; mkdir -p scripts prisma .vscode

# ---------------------------------------------------------------------------
# package.json updates (scripts/dev deps)
CONTENT='{
  "name": "propokertv",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:seed": "ts-node --compiler-options {\\"module\\":\\"CommonJS\\"} prisma/seed.ts"
  }
}'
if [ -f package.json ]; then
  # merge minimal: if using jq, do a real merge; otherwise ensure scripts exist
  if command -v jq >/dev/null 2>&1; then
    NEW=$(jq '.scripts["db:seed"]="ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"' package.json)
    printf "%s\n" "$NEW" > package.json
    echo "  ✓ package.json scripts updated"
  else
    echo "  ⚠ jq missing: ensure \"db:seed\" script exists in package.json"
  fi
fi

# ---------------------------------------------------------------------------
# env validation (Zod)
CONTENT='import { z } from "zod";

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
'
write src/lib/env.ts

# ---------------------------------------------------------------------------
# Prisma schema (NextAuth + content models)
CONTENT='// prisma/schema.prisma
// Run: npx prisma generate && npx prisma migrate dev --name init

generator client { provider = "prisma-client-js" }

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String   @id @default(cuid())
  name          String?
  email         String?  @unique
  emailVerified DateTime?
  image         String?
  role          String   @default("user")
  progress      PlaybackProgress[]
  likes         Like[]
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime @default(now())
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  @@unique([identifier, token])
}

model Category {
  id    String @id @default(cuid())
  name  String @unique
  videos Video[]
}

model Video {
  id          String   @id @default(cuid())
  title       String
  durationSec Int
  thumbnail   String
  vendor      String   // mux|cloudflare
  playbackId  String   // mux playback id or cloudflare video uid
  categoryId  String?
  category    Category? @relation(fields: [categoryId], references: [id])
  createdAt   DateTime @default(now())
  progress    PlaybackProgress[]
  likes       Like[]
}

model PlaybackProgress {
  id        String  @id @default(cuid())
  userId    String
  videoId   String
  position  Int     @default(0) // seconds
  updatedAt DateTime @updatedAt
  user      User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  video     Video  @relation(fields: [videoId], references: [id], onDelete: Cascade)
  @@unique([userId, videoId])
}

model Like {
  id      String @id @default(cuid())
  userId  String
  videoId String
  user    User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  video   Video @relation(fields: [videoId], references: [id], onDelete: Cascade)
  @@unique([userId, videoId])
}
'
write prisma/schema.prisma

# ---------------------------------------------------------------------------
# Prisma seed (TS)
CONTENT='// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main(){
  const cat = await db.category.upsert({ where: { name: "MTT" }, update: {}, create: { name: "MTT" } });

  const vendor = process.env.VIDEO_VENDOR || "mux";
  const demo = [
    { title: "BTN vs SB 3-bet — Exploit", durationSec: 427, thumbnail: "https://images.unsplash.com/photo-1529400971008-f566de0e6dfc?auto=format&fit=crop&w=1200&q=60", playbackId: vendor==="mux"? "demo" : "demo", vendor },
    { title: "CO 4-bet Bluff Lines", durationSec: 512, thumbnail: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1200&q=60", playbackId: vendor==="mux"? "demo" : "demo", vendor },
  ];

  for(const v of demo){
    await db.video.create({ data: { ...v, categoryId: cat.id } });
  }
}

main().then(()=> db.$disconnect()).catch((e)=>{ console.error(e); process.exit(1) })
'
write prisma/seed.ts

# ---------------------------------------------------------------------------
# NextAuth route with Email provider + Prisma adapter
CONTENT='// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import EmailProvider from "next-auth/providers/email";
import type { NextAuthOptions } from "next-auth";
import { env } from "@/lib/env";
import nodemailer from "nodemailer";
import Postmark from "postmark";

const prisma = new PrismaClient();

function getEmailConfig(){
  if(env.AUTH_EMAIL_PROVIDER === "postmark"){
    const client = new Postmark.ServerClient(process.env.POSTMARK_TOKEN!);
    return {
      async sendVerificationRequest({ identifier, url }){
        await client.sendEmail({
          From: env.AUTH_EMAIL_FROM,
          To: identifier,
          Subject: "Your ProPokerTV sign-in link",
          TextBody: `Sign in: ${url}\nThis link expires in 10 minutes.`,
          HtmlBody: `<p>Sign in:</p><p><a href="${url}">${url}</a></p><p>This link expires in 10 minutes.</p>`
        });
      }
    };
  }
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT||587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  return {
    async sendVerificationRequest({ identifier, url }){
      await transport.sendMail({
        to: identifier,
        from: env.AUTH_EMAIL_FROM,
        subject: "Your ProPokerTV sign-in link",
        text: `Sign in: ${url}\nThis link expires in 10 minutes.`,
        html: `<p>Sign in:</p><p><a href="${url}">${url}</a></p><p>This link expires in 10 minutes.</p>`
      });
    }
  };
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: { strategy: "jwt" },
  providers: [
    EmailProvider({
      from: env.AUTH_EMAIL_FROM,
      maxAge: 10 * 60,
      sendVerificationRequest: getEmailConfig().sendVerificationRequest,
    })
  ],
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
'
write src/app/api/auth/[...nextauth]/route.ts

# ---------------------------------------------------------------------------
# Minimal helpers to get server session in Server Components if needed
CONTENT='// src/lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function session(){ return getServerSession(authOptions as any) }
'
write src/lib/auth.ts

# ---------------------------------------------------------------------------
# Player abstraction (react-player HLS URLs)
CONTENT='// src/components/Player.tsx
"use client";
import React from "react";
import ReactPlayer from "react-player"

export default function Player({ vendor, playbackId }: { vendor: "mux"|"cloudflare"; playbackId: string }){
  const url = vendor === "mux"
    ? `https://${process.env.NEXT_PUBLIC_MUX_PLAYBACK_DOMAIN || "stream.mux.com"}/${playbackId}.m3u8`
    : `https://videodelivery.net/${playbackId}/manifest/video.m3u8`;
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
      <ReactPlayer url={url} controls width="100%" height="100%" playing={false} />
    </div>
  );
}
'
write src/components/Player.tsx

# ---------------------------------------------------------------------------
# API routes: videos list + search + progress upsert (mock/simple)
CONTENT='// src/app/api/videos/route.ts
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export async function GET(){
  const items = await db.video.findMany({ take: 24, orderBy: { createdAt: "desc" }, include: { category: true } });
  return Response.json(items);
}
'
write src/app/api/videos/route.ts

CONTENT='// src/app/api/search/route.ts
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  const items = await db.video.findMany({
    where: { title: { contains: q, mode: "insensitive" } },
    take: 24,
  });
  return Response.json(items);
}
'
write src/app/api/search/route.ts

CONTENT='// src/app/api/progress/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const db = new PrismaClient();
export async function POST(req: NextRequest){
  const { userId, videoId, position } = await req.json();
  const row = await db.playbackProgress.upsert({
    where: { userId_videoId: { userId, videoId } },
    update: { position },
    create: { userId, videoId, position },
  });
  return Response.json(row);
}
'
write src/app/api/progress/route.ts

# ---------------------------------------------------------------------------
# Wire Player into watch page (non-breaking if no DB yet)
CONTENT='import { PrismaClient } from "@prisma/client";
import Player from "@/components/Player";

const db = new PrismaClient();

export default async function VideoPage({params}:{params:{id:string}}){
  const v = await db.video.findUnique({ where: { id: params.id } });
  if(!v) return <div className="rounded-2xl border p-6">Not found</div>;
  return (
    <article className="grid gap-4 lg:grid-cols-[1fr,360px]">
      <div className="rounded-2xl border p-2">
        <Player vendor={v.vendor as any} playbackId={v.playbackId} />
      </div>
      <aside className="grid gap-3">
        <div className="rounded-2xl border p-3"><h2 className="font-semibold">{v.title}</h2></div>
      </aside>
    </article>
  )
}
'
write src/app/video/[id]/page.tsx

# ---------------------------------------------------------------------------
# .env.example
CONTENT="""# --- NextAuth ---
NEXTAUTH_SECRET=changeme
NEXTAUTH_URL=http://localhost:3000
AUTH_EMAIL_FROM=no-reply@yourdomain.com
AUTH_EMAIL_PROVIDER=${PROVIDER}   # postmark|smtp

# Postmark (if provider=postmark)
POSTMARK_TOKEN=pm-xxxx

# SMTP (if provider=smtp)
SMTP_HOST=smtp.yourhost.com
SMTP_PORT=587
SMTP_USER=username
SMTP_PASS=password

# --- Database ---
DATABASE_URL=postgresql://user:pass@localhost:5432/propokertv?schema=public

# --- Video vendor ---
VIDEO_VENDOR=${VIDEO}            # mux|cloudflare
MUX_PLAYBACK_DOMAIN=stream.mux.com
# for cloudflare stream you typically just need the playback uid per video
CLOUDFLARE_ACCOUNT_HASH=
"""
write .env.example

# ---------------------------------------------------------------------------
# VSCode launch/task helper (optional)
CONTENT='{
  "version": "0.2.0",
  "configurations": [
    { "type": "node", "request": "launch", "name": "Next.js", "program": "${workspaceFolder}/node_modules/next/dist/bin/next", "args": ["dev"], "cwd": "${workspaceFolder}", "envFile": "${workspaceFolder}/.env" }
  ]
}
'
write .vscode/launch.json

# ---------------------------------------------------------------------------
# Install hints printed at end
cat <<MSG

Done. Backups saved in $BACKUP_DIR (if overwrites occurred).
Next steps:
  1) Install deps:  pnpm add @prisma/client next-auth @auth/prisma-adapter zod nodemailer postmark && pnpm add -D prisma ts-node
     (npm/yarn works too)
  2) npx prisma generate
  3) npx prisma migrate dev --name init
  4) pnpm db:seed
  5) Copy .env.example → .env and fill values (choose provider & vendor)
  6) pnpm dev
MSG
