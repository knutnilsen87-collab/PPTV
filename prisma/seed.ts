// prisma/seed.ts
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

