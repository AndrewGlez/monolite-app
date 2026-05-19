import type { UserRow } from "#/domain/entities/user.js";

export interface CreateUserRow {
  name: string;
  email: string;
  hashedPassword: string;
  role: "user" | "admin";
}

export interface UserRepository {
  findByEmail(email: string): Promise<UserRow | null>;
  findById(id: string): Promise<UserRow | null>;
  create(data: CreateUserRow): Promise<UserRow>;
  update(id: string, data: Partial<CreateUserRow>): Promise<UserRow>;
  findAll(): Promise<UserRow[]>;
}
