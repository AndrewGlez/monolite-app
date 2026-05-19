import type { UserResponseDTO } from "#/application/dto/user-response.dto.js";

export interface ListUsersUseCase {
  execute(): Promise<UserResponseDTO[]>;
}
