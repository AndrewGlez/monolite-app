import type { UserResponseDTO } from "#/application/dto/user-response.dto.js";
import type { ListUsersUseCase } from "#/application/ports/input/list-users-use-case.js";
import type { UserRepository } from "#/application/ports/output/user-repository.js";

export class ListUsers implements ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }
}
