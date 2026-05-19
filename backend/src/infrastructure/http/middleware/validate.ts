import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { AppError } from "./error-handler.js";

type ValidationSchema = ZodSchema<{
  body?: unknown;
  query?: unknown;
  params?: unknown;
}>;

export function validate(schema: ValidationSchema) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      if (result.body !== undefined) req.body = result.body;
      if (result.query !== undefined)
        req.query = result.query as typeof req.query;
      if (result.params !== undefined)
        req.params = result.params as typeof req.params;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(new AppError(JSON.stringify(err.errors), 400));
        return;
      }
      next(err);
    }
  };
}
