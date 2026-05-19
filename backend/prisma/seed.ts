import { PrismaClient } from "../src/generated/prisma/client.js";
import { Role } from "../src/generated/prisma/enums.ts";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin123456", 10);
  const userPassword = await bcrypt.hash("user123456", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "usuario@example.com" },
    update: {},
    create: {
      name: "Usuario",
      email: "usuario@example.com",
      password: userPassword,
      role: Role.USER,
    },
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
