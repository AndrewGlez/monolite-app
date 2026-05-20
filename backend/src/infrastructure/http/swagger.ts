import fs from "fs";
import path from "path";
import { env } from "#/shared/config/env.ts";

const swaggerOutputPath = path.join(__dirname, "swagger-output.json");

let swaggerSpec: object;

if (fs.existsSync(swaggerOutputPath)) {
  swaggerSpec = JSON.parse(fs.readFileSync(swaggerOutputPath, "utf-8"));
} else {
  swaggerSpec = {
    openapi: "3.0.0",
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "REST API for user management and authentication",
    },
    servers: [
      {
        url: `http://localhost:${env.port || 3000}`,
        description: "Development server",
      },
    ],
    paths: {},
  };
}

export { swaggerSpec };
