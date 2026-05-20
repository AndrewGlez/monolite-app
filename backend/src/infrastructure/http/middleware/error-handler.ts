import { Request, Response, NextFunction } from "express";
import { AppError } from "#/shared/errors/index.ts";

export { AppError };

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    process.env.NODE_ENV === "development"
      ? err.message
      : statusCode === 500
        ? "Internal server error"
        : err.message;

  console.error(`[ERROR] ${err.message}`, err.stack);
  res.status(statusCode).json({ error: message });
}
