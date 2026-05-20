import { describe, it, expect, vi } from "vitest";
import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { validate } from "./validate.js";
import { AppError } from "./error-handler.js";

describe("validate middleware", () => {
  it("should pass an AppError with status 400 when Zod validation fails", async () => {
    // Arrange: create a schema that always throws ZodError
    const schema = {
      parse: () => {
        throw new ZodError([
          { message: "Required", path: ["body", "email"], code: "invalid_type", expected: "string", received: "undefined" },
        ]);
      },
    } as unknown as ZodSchema<{ body?: unknown }>;

    const middleware = validate(schema);
    const req = { body: {} } as Request;
    const res = {} as Response;
    const next = vi.fn();

    // Act
    await middleware(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledTimes(1);
    const errorArg = next.mock.calls[0][0];
    expect(errorArg).toBeInstanceOf(AppError);
    expect(errorArg.statusCode).toBe(400);
    expect(errorArg.message).toContain("Required");
  });

  it("should call next() without error when validation passes", async () => {
    // Arrange: create a schema that returns successfully
    const schema = {
      parse: (input: unknown) => input,
    } as unknown as ZodSchema<{ body?: unknown }>;

    const middleware = validate(schema);
    const req = { body: { name: "John" } } as Request;
    const res = {} as Response;
    const next = vi.fn();

    // Act
    await middleware(req, res, next);

    // Assert
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });
});
