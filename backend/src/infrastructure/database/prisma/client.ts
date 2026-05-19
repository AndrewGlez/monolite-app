import { env } from "process";
import { PrismaClient } from "../generated/prisma";

class PrismaDatabase {
  private static instance: PrismaClient;

  private constructor() {}

  static getInstance(): PrismaClient {
    if (!PrismaDatabase.instance) {
      PrismaDatabase.instance = new PrismaClient({
        log: env.isDevelopment ? ["query", "warn", "error"] : ["warn", "error"],
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
