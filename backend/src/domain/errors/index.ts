import { AppError } from "../../shared/errors/index.js";

export class InvalidCredentialsError extends AppError {
  constructor() {
    super("Invalid credentials", 401);
  }
}

export class EmailAlreadyExistsError extends AppError {
  constructor() {
    super("Email already exists", 409);
  }
}

export class UserNotFoundError extends AppError {
  constructor() {
    super("User not found", 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super("Unauthorized", 401);
  }
}

export class ForbiddenError extends AppError {
  constructor() {
    super("Forbidden", 403);
  }
}
