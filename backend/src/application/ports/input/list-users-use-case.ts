import type { PaginatedUsersDTO } from "#/application/dto/paginated-users.dto.js";

export interface ListUsersInput {
  page: number;
  limit: number;
  search?: string;
}

export interface ListUsersUseCase {
  execute(input: ListUsersInput): Promise<PaginatedUsersDTO>;
}
