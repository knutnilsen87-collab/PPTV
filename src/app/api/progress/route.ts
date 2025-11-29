// src/app/api/progress/route.ts
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

