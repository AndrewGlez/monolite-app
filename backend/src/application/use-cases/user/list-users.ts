import type { UserResponseDTO } from "#/application/dto/user-response.dto.js";
import type { PaginatedUsersDTO } from "#/application/dto/paginated-users.dto.js";
import type {
  ListUsersUseCase,
  ListUsersInput,
} from "#/application/ports/input/list-users-use-case.js";
import type { UserRepository } from "#/application/ports/output/user-repository.js";

export class ListUsers implements ListUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: ListUsersInput): Promise<PaginatedUsersDTO> {
    const result = await this.userRepository.findAll(input);

    const users: UserResponseDTO[] = result.data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    return {
      users,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }
}
