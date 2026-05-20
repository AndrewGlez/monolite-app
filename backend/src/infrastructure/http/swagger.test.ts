import { describe, it, expect } from "vitest";
import { swaggerSpec } from "./swagger.js";

describe("swagger configuration", () => {
  it("should have title 'User Management API'", () => {
    const spec = swaggerSpec as Record<string, unknown>;
    expect((spec.info as Record<string, unknown>).title).toBe("User Management API");
  });

  it("should describe user management", () => {
    const spec = swaggerSpec as Record<string, unknown>;
    expect((spec.info as Record<string, unknown>).description).toContain("user");
  });
});
