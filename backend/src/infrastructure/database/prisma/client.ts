import { env } from "#/shared/config/env.ts";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client.js";

class PrismaDatabase {
  private static instance: PrismaClient;

  private constructor() {}

  static getInstance(): PrismaClient {
    if (!PrismaDatabase.instance) {
      const adapter = new PrismaPg({
        connectionString: env.databaseUrl,
      });
      PrismaDatabase.instance = new PrismaClient({
        adapter,
        log:
          env.nodeEnv === "development"
            ? ["query", "warn", "error"]
            : ["warn", "error"],
      });
    }
    return PrismaDatabase.instance;
  }

  static async disconnect(): Promise<void> {
    if (PrismaDatabase.instance) {
      await PrismaDatabase.instance.$disconnect();
    }
  }
}

export const prisma = PrismaDatabase.getInstance();
