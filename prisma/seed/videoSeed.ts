import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Rydd opp gamle demo-data
  await db.vote.deleteMany({});
  await db.video.deleteMany({});
  await db.user.deleteMany({
    where: { email: "demo@propokertv.test" },
  });

  const video = await db.video.create({
    data: {
      title: "Demo Poker Stream – High Stakes Final Table",
      description: "En demostream som viser hvordan ProPokerTV-klipp ser ut i feeden.",
      url: "https://example.com/demo-stream.m3u8", // TODO: bytt til ekte HLS/YouTube/Twitch-URL
      thumbnail: "/images/thumbnail-1.jpeg",
      user: {
        create: {
          email: "demo@propokertv.test",
          name: "Demo User",
        },
      },
    },
  });

  console.log("✅ Seed ferdig. Laget video med id:", video.id);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
