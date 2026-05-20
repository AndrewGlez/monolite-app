import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaPath = resolve(__dirname, "../../../../prisma/schema.prisma");
const schema = readFileSync(schemaPath, "utf-8");

describe("prisma schema", () => {
  it("should not contain Todo model", () => {
    expect(schema).not.toContain("model Todo");
  });

  it("should contain User model", () => {
    expect(schema).toContain("model User");
  });

  it("should contain Role enum", () => {
    expect(schema).toContain("enum Role");
  });

  it("should define User with required fields", () => {
    expect(schema).toContain("id");
    expect(schema).toContain("@id @default(uuid())");
    expect(schema).toContain("name");
    expect(schema).toContain("email");
    expect(schema).toContain("@unique");
    expect(schema).toContain("password");
    expect(schema).toContain("role");
    expect(schema).toContain("@default(USER)");
  });
});
