import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions as any);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file");
    const title = (formData.get("title") as string) || "Untitled clip";
    const description = (formData.get("description") as string) || "";

    if (!(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Missing file" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "clips");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Prøv å hente filendelse fra "name" hvis den finnes
    const anyFile = file as any;
    const originalName: string = anyFile?.name || "clip.mp4";
    const ext = originalName.includes(".")
      ? originalName.split(".").pop()!
      : "mp4";

    const fileName = `${Date.now()}-${randomUUID()}.${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/clips/${fileName}`;

    // Foreløpig ingen DB – vi returnerer en "mock" clip
    const mockClip = {
      id: randomUUID(),
      title,
      description,
      url: publicUrl,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ clip: mockClip }, { status: 201 });
  } catch (err) {
    console.error("[upload clip] error", err);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}
