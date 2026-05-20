import { prisma } from "#/infrastructure/database/prisma/client.ts";
import type {
  CreateUserRow,
  FindAllOptions,
  PaginatedResult,
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

  async findAll(options: FindAllOptions): Promise<PaginatedResult<UserRow>> {
    const { page, limit, search } = options;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data: users.map(mapToUserRow),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
