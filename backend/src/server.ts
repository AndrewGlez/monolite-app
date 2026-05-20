import type { Express } from "express";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "#/shared/config/env.ts";
import { prisma } from "#/infrastructure/database/prisma/client.ts";
import { errorHandler } from "#/infrastructure/http/middleware/error-handler.ts";
import { swaggerSpec } from "#/infrastructure/http/swagger.ts";
import { authRoutes } from "#/infrastructure/http/routes/auth.routes.ts";
import { userRoutes } from "#/infrastructure/http/routes/user.routes.ts";
import "#/shared/types/express.d.ts";

const app: Express = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(morgan(env.nodeEnv === "development" ? "dev" : "combined"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const port = env.nodeEnv === "test" ? 0 : process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});

export { app, server };
