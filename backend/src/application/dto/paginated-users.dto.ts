import type { UserResponseDTO } from "./user-response.dto.js";

export interface PaginatedUsersDTO {
  users: UserResponseDTO[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
