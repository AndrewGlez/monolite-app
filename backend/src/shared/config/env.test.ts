import { describe, it, expect, vi } from "vitest";

describe("env configuration", () => {
  it("should expose jwtSecret getter", async () => {
    process.env.JWT_SECRET = "test-secret-key-12345";
    process.env.DATABASE_URL = "postgresql://test@test/test";

    vi.resetModules();
    const { env } = await import("./env.js");

    expect(env.jwtSecret).toBe("test-secret-key-12345");
  });

  it("should expose jwtExpiresIn getter with default", async () => {
    process.env.JWT_SECRET = "test-secret-key-12345";
    process.env.DATABASE_URL = "postgresql://test@test/test";

    vi.resetModules();
    const { env } = await import("./env.js");

    expect(env.jwtExpiresIn).toBe("7d");
  });

  it("should allow custom jwtExpiresIn", async () => {
    process.env.JWT_SECRET = "test-secret-key-12345";
    process.env.DATABASE_URL = "postgresql://test@test/test";
    process.env.JWT_EXPIRES_IN = "1h";

    vi.resetModules();
    const { env } = await import("./env.js");

    expect(env.jwtExpiresIn).toBe("1h");

    // Clean up
    delete process.env.JWT_EXPIRES_IN;
  });
});
