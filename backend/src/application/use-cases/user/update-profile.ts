import type { UpdateProfileDTO } from "#/application/dto/update-profile.dto.js";
import type { UserResponseDTO } from "#/application/dto/user-response.dto.js";
import type { UpdateProfileUseCase } from "#/application/ports/input/update-profile-use-case.js";
import type { UserRepository } from "#/application/ports/output/user-repository.js";
import { UserNotFoundError } from "#/domain/errors/index.js";

export class UpdateProfile implements UpdateProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    userId: string,
    dto: UpdateProfileDTO,
  ): Promise<UserResponseDTO> {
    if (!dto.name || dto.name.trim().length === 0) {
      throw new Error("Name is required");
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    const updatedUser = await this.userRepository.update(userId, {
      name: dto.name.trim(),
    });

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    };
  }
}
