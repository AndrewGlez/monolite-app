import jwt from "jsonwebtoken";
import type {
  TokenPayload,
  TokenService,
} from "#/application/ports/output/token-service.ts";
import { env } from "#/shared/config/env.ts";

export class JwtTokenService implements TokenService {
  generate(payload: TokenPayload): string {
    return jwt.sign(payload, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
    });
  }

  verify(token: string): TokenPayload {
    const decoded = jwt.verify(token, env.jwtSecret) as TokenPayload;
    return decoded;
  }
}
