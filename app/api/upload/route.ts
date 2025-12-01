import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import { db } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title")?.toString() || "Untitled clip";
    const description = formData.get("description")?.toString() || "";
    const userId = formData.get("userId")?.toString();

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "File must be a video" },
        { status: 400 }
      );
    }

    const publicRoot = path.join(process.cwd(), "public");
    const videosDir = path.join(publicRoot, "uploads", "videos");

    await fs.mkdir(videosDir, { recursive: true });

    const originalName = (file as any).name || "clip.mp4";
    const ext = path.extname(originalName) || ".mp4";
    const safeBase =
      "clip_" +
      Date.now().toString() +
      "_" +
      Math.random().toString(36).slice(2, 8);
    const fileName = safeBase + ext;

    const filePath = path.join(videosDir, fileName);
    const fileArrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileArrayBuffer);

    await fs.writeFile(filePath, buffer);

    const videoUrl = `/uploads/videos/${fileName}`;

    const clip = await db.clip.create({
      data: {
        title,
        description,
        videoUrl,
        status: "PENDING",
        userId,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        clip,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
