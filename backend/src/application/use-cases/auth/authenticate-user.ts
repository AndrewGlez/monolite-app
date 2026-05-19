import type { AuthResponseDTO } from "#/application/dto/auth-response.dto.js";
import type { LoginUserDTO } from "#/application/dto/login-user.dto.js";
import type { AuthenticateUserUseCase } from "#/application/ports/input/authenticate-user-use-case.js";
import type { PasswordHasher } from "#/application/ports/output/password-hasher.js";
import type { TokenService } from "#/application/ports/output/token-service.js";
import type { UserRepository } from "#/application/ports/output/user-repository.js";
import { InvalidCredentialsError } from "#/domain/errors/index.js";

export class AuthenticateUser implements AuthenticateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}

  async execute(dto: LoginUserDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isValid = await this.passwordHasher.compare(
      dto.password,
      user.hashedPassword,
    );
    if (!isValid) {
      throw new InvalidCredentialsError();
    }

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
