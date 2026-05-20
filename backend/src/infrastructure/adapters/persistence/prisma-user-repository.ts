import { prisma } from "#/infrastructure/database/prisma/client.ts";
import type {
  CreateUserRow,
  UserRepository,
} from "#/application/ports/output/user-repository.ts";
import type { UserRow } from "#/domain/entities/user.ts";
import { Role } from "#/generated/prisma/enums.ts";

function mapPrismaRole(role: Role): "user" | "admin" {
  return role === Role.ADMIN ? "admin" : "user";
}

function mapDomainRole(role: "user" | "admin"): Role {
  return role === "admin" ? Role.ADMIN : Role.USER;
}

function mapToUserRow(user: {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}): UserRow {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: mapPrismaRole(user.role),
    hashedPassword: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<UserRow | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return mapToUserRow(user);
  }

  async findById(id: string): Promise<UserRow | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return mapToUserRow(user);
  }

  async create(data: CreateUserRow): Promise<UserRow> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.hashedPassword,
        role: mapDomainRole(data.role),
      },
    });
    return mapToUserRow(user);
  }

  async update(id: string, data: Partial<CreateUserRow>): Promise<UserRow> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.hashedPassword !== undefined && {
          password: data.hashedPassword,
        }),
        ...(data.role !== undefined && { role: mapDomainRole(data.role) }),
      },
    });
    return mapToUserRow(user);
  }

  async findAll(): Promise<UserRow[]> {
    const users = await prisma.user.findMany();
    return users.map(mapToUserRow);
  }
}
