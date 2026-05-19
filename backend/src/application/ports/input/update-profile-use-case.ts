import type { UpdateProfileDTO } from "#/application/dto/update-profile.dto.js";
import type { UserResponseDTO } from "#/application/dto/user-response.dto.js";

export interface UpdateProfileUseCase {
  execute(userId: string, dto: UpdateProfileDTO): Promise<UserResponseDTO>;
}
