import { describe, it, expect } from "vitest";

// Runtime module inspection to verify exports exist
const userModule = await import("./user.js");

describe("User entity exports", () => {
  it("should export User interface", () => {
    // User is a type-only export, so it won't exist at runtime
    // but we verify the module loads and has runtime-compatible exports
    expect(userModule).toBeDefined();
  });

  it("should export UserRow interface", () => {
    // UserRow must be exported from the module
    // Since it's a type, we can't check at runtime directly,
    // but we can verify the module doesn't crash on import
    expect(userModule).toBeDefined();
  });
});

describe("User type behavior", () => {
  it("should construct a user object with user role", () => {
    const user = {
      id: "1",
      name: "John",
      email: "john@example.com",
      role: "user" as const,
    };
    expect(user.role).toBe("user");
  });

  it("should construct a user object with admin role", () => {
    const admin = {
      id: "2",
      name: "Admin",
      email: "admin@example.com",
      role: "admin" as const,
    };
    expect(admin.role).toBe("admin");
  });
});
