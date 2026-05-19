import type { UserResponseDTO } from "#/application/dto/user-response.dto.js";

export interface GetProfileUseCase {
  execute(userId: string): Promise<UserResponseDTO>;
}
