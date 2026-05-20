import swaggerAutogen from "swagger-autogen";
import { authRoutes } from "#/infrastructure/http/routes/auth.routes.ts";
import { userRoutes } from "#/infrastructure/http/routes/user.routes.ts";

const port = process.env.PORT || "3000";

const doc = {
  info: {
    title: "User Management API",
    version: "1.0.0",
    description: "REST API for user management and authentication",
  },
  servers: [{ url: `http://localhost:${port}` }],
  security: [{ bearerAuth: [] }],
};

const outputFile = "./src/infrastructure/http/swagger-output.json";

swaggerAutogen()(outputFile, [authRoutes, userRoutes], doc).then(() => {
  console.log("Swagger spec generated");
});