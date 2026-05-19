import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "#/domain/errors/index.ts";
import { JwtTokenService } from "#/infrastructure/adapters/auth/jwt-token-service.ts";

const tokenService = new JwtTokenService();

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError();
  }

  const token = authHeader.slice(7);

  try {
    const payload = tokenService.verify(token);
    req.user = {
      userId: payload.userId,
      role: payload.role,
    };
    next();
  } catch {
    throw new UnauthorizedError();
  }
}
