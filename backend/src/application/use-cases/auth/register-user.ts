import type { AuthResponseDTO } from "#/application/dto/auth-response.dto.js";
import type { RegisterUserDTO } from "#/application/dto/register-user.dto.js";
import type { RegisterUserUseCase } from "#/application/ports/input/register-user-use-case.js";
import type { PasswordHasher } from "#/application/ports/output/password-hasher.js";
import type { TokenService } from "#/application/ports/output/token-service.js";
import type { UserRepository } from "#/application/ports/output/user-repository.js";
import { EmailAlreadyExistsError } from "#/domain/errors/index.js";

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}

  async execute(dto: RegisterUserDTO): Promise<AuthResponseDTO> {
    if (dto.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new EmailAlreadyExistsError();
    }

    const hashedPassword = await this.passwordHasher.hash(dto.password);

    const user = await this.userRepository.create({
      name: dto.name,
      email: dto.email,
      hashedPassword,
      role: "user",
    });

    const token = this.tokenService.generate({
      userId: user.id,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
