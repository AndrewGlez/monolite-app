import { describe, it, expect } from "vitest";
import {
  InvalidCredentialsError,
  EmailAlreadyExistsError,
  UserNotFoundError,
  UnauthorizedError,
  ForbiddenError,
} from "./index.js";
import { AppError } from "../../shared/errors/index.js";

describe("domain errors", () => {
  it("InvalidCredentialsError extends AppError with status 401", () => {
    const err = new InvalidCredentialsError();
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(401);
    expect(err.message).toBe("Invalid credentials");
  });

  it("EmailAlreadyExistsError extends AppError with status 409", () => {
    const err = new EmailAlreadyExistsError();
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(409);
    expect(err.message).toBe("Email already exists");
  });

  it("UserNotFoundError extends AppError with status 404", () => {
    const err = new UserNotFoundError();
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe("User not found");
  });

  it("UnauthorizedError extends AppError with status 401", () => {
    const err = new UnauthorizedError();
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(401);
    expect(err.message).toBe("Unauthorized");
  });

  it("ForbiddenError extends AppError with status 403", () => {
    const err = new ForbiddenError();
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(403);
    expect(err.message).toBe("Forbidden");
  });
});
