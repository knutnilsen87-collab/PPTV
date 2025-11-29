// src/app/api/search/route.ts
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

