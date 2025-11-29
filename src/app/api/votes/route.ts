import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const db = new PrismaClient();

/**
 * POST /api/votes
 * Body: { videoId: string }
 *
 * For enkelhet bruker vi en "guest"-bruker i denne MVP-en.
 * Senere kan dette knyttes til ekte innlogget bruker via NextAuth.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const videoId = body?.videoId as string | undefined;

    if (!videoId) {
      return NextResponse.json(
        { error: "videoId er påkrevd" },
        { status: 400 }
      );
    }

    const video = await db.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      return NextResponse.json(
        { error: "Fant ikke video" },
        { status: 404 }
      );
    }

    // Demo-bruker for stemmegiving (erstatt med ekte auth senere)
    const guest = await db.user.upsert({
      where: { email: "guest-voter@propokertv.test" },
      create: {
        email: "guest-voter@propokertv.test",
        name: "Guest Voter",
      },
      update: {},
    });

    try {
      await db.vote.create({
        data: {
          videoId,
          userId: guest.id,
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        // Unique constraint (videoId, userId)
        return NextResponse.json(
          { error: "Denne demo-brukeren har allerede stemt på denne videoen." },
          { status: 409 }
        );
      }
      throw err;
    }

    const votes = await db.vote.count({
      where: { videoId },
    });

    return NextResponse.json(
      { videoId, votes },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/votes] error", err);
    return NextResponse.json(
      { error: "Kunne ikke registrere stemme" },
      { status: 500 }
    );
  }
}
