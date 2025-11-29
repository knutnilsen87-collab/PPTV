import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function GET() {
  try {
    const videos = await db.video.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        votes: true,
      },
      take: 50,
    });

    return NextResponse.json(
      videos.map((v) => ({
        id: v.id,
        title: v.title,
        description: v.description,
        url: v.url,
        thumbnail: v.thumbnail,
        createdAt: v.createdAt,
        author: v.user,
        votes: v.votes.length,
      })),
      { status: 200 }
    );
  } catch (err) {
    console.error("[GET /api/videos] error", err);
    return NextResponse.json(
      { error: "Kunne ikke hente videoer" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, url, description, thumbnail, userId } = body ?? {};

    if (!title || !url) {
      return NextResponse.json(
        { error: "title og url er påkrevd" },
        { status: 400 }
      );
    }

    // TODO: hent ekte bruker fra session; nå aksepterer vi optional userId
    const video = await db.video.create({
      data: {
        title,
        url,
        description: description ?? null,
        thumbnail: thumbnail ?? null,
        user: userId
          ? { connect: { id: userId } }
          : {
              // fallback: lag en demo-bruker hvis ingen userId er oppgitt
              create: {
                email: `upload-${Date.now()}@propokertv.test`,
                name: "Upload User",
              },
            },
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (err) {
    console.error("[POST /api/videos] error", err);
    return NextResponse.json(
      { error: "Kunne ikke opprette video" },
      { status: 500 }
    );
  }
}
