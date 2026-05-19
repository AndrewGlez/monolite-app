import type { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "#/domain/errors/index.ts";

export function adminMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (req.user?.role !== "admin") {
    throw new ForbiddenError();
  }
  next();
}
