import type { UserRow } from "#/domain/entities/user.js";

export interface CreateUserRow {
  name: string;
  email: string;
  hashedPassword: string;
  role: "user" | "admin";
}

export interface FindAllOptions {
  page: number;
  limit: number;
  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserRepository {
  findByEmail(email: string): Promise<UserRow | null>;
  findById(id: string): Promise<UserRow | null>;
  create(data: CreateUserRow): Promise<UserRow>;
  update(id: string, data: Partial<CreateUserRow>): Promise<UserRow>;
  findAll(options: FindAllOptions): Promise<PaginatedResult<UserRow>>;
}
