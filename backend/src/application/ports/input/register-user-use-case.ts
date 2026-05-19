import type { AuthResponseDTO } from "#/application/dto/auth-response.dto.js";
import type { RegisterUserDTO } from "#/application/dto/register-user.dto.js";

export interface RegisterUserUseCase {
  execute(dto: RegisterUserDTO): Promise<AuthResponseDTO>;
}
