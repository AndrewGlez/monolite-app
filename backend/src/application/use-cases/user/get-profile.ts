import type { UserResponseDTO } from "#/application/dto/user-response.dto.js";
import type { GetProfileUseCase } from "#/application/ports/input/get-profile-use-case.js";
import type { UserRepository } from "#/application/ports/output/user-repository.js";
import { UserNotFoundError } from "#/domain/errors/index.js";

export class GetProfile implements GetProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError();
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
