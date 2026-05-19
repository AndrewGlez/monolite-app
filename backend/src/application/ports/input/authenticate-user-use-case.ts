import type { AuthResponseDTO } from "#/application/dto/auth-response.dto.js";
import type { LoginUserDTO } from "#/application/dto/login-user.dto.js";

export interface AuthenticateUserUseCase {
  execute(dto: LoginUserDTO): Promise<AuthResponseDTO>;
}
