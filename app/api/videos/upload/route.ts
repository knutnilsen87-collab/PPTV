import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      durationSeconds,
      tag,
      kind,
    } = body ?? {};

    if (!title || !videoUrl) {
      return NextResponse.json(
        { error: "Title and video URL are required." },
        { status: 400 }
      );
    }

    const safeDuration =
      typeof durationSeconds === "number" && durationSeconds > 0
        ? Math.round(durationSeconds)
        : 0;

    const video = await db.video.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        durationSeconds: safeDuration,
        tag,
        kind,
        // Bruker "kind" som vendor hvis satt, ellers "UPLOAD"
        vendor: kind ?? "UPLOAD",
      },
    });

    return NextResponse.json({ ok: true, video });
  } catch (error) {
    console.error("[VIDEO_UPLOAD_ERROR]", error);
    return NextResponse.json(
      { error: "Something went wrong while creating the video." },
      { status: 500 }
    );
  }
}
