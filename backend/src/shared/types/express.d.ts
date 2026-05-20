import type { TokenPayload } from "#/application/ports/output/token-service.ts";

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
      validated: {
        body?: unknown;
        query?: unknown;
        params?: unknown;
      };
    }
  }
}
