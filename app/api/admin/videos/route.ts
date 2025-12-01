import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// Small helper to ensure only admins can call this route
async function requireAdmin() {
  const session = await getServerSession(authOptions as any);
  const role = (session as any)?.user?.role as string | undefined;

  if (!session || role !== "ADMIN") {
    return null;
  }

  return session;
}

export async function GET(_req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const videos = await db.video.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      title: true,
      vendor: true,
      thumbnail: true,
      createdAt: true,
      url: true,
    },
  });

  return NextResponse.json({ videos });
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);

  if (!body || !body.id || !body.action) {
    return NextResponse.json({ error: "id and action are required" }, { status: 400 });
  }

  const { id, action } = body as { id: string; action: string };

  if (action === "delete") {
    try {
      await db.video.delete({ where: { id } });
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Failed to delete video" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
