import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@propokertv.com";
  const adminPassword = "Admin123!"; // change in production

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      role: "ADMIN",
      password: passwordHash,
      displayName: "Admin",
      name: "Admin",
    },
    create: {
      email: adminEmail,
      password: passwordHash,
      role: "ADMIN",
      displayName: "Admin",
      name: "Admin",
    },
  });

  console.log("Seeded admin user:");
  console.log("  email:    " + adminEmail);
  console.log("  password: " + adminPassword);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
