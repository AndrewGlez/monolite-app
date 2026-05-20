import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = resolve(__dirname, "../../../package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));

describe("backend dependencies", () => {
  it("should include jsonwebtoken in dependencies", () => {
    expect(pkg.dependencies).toHaveProperty("jsonwebtoken");
  });

  it("should include bcryptjs in dependencies", () => {
    expect(pkg.dependencies).toHaveProperty("bcryptjs");
  });

  it("should include supertest in devDependencies", () => {
    expect(pkg.devDependencies).toHaveProperty("supertest");
  });

  it("should include @types/jsonwebtoken in devDependencies", () => {
    expect(pkg.devDependencies).toHaveProperty("@types/jsonwebtoken");
  });

  it("should include @types/bcryptjs in devDependencies", () => {
    expect(pkg.devDependencies).toHaveProperty("@types/bcryptjs");
  });

  it("should include @types/supertest in devDependencies", () => {
    expect(pkg.devDependencies).toHaveProperty("@types/supertest");
  });
});
