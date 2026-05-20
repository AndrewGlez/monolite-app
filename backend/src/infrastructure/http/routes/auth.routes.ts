import { Router, type Router as RouterType } from "express";
import { z } from "zod";
import { RegisterUser } from "#/application/use-cases/auth/register-user.ts";
import { AuthenticateUser } from "#/application/use-cases/auth/authenticate-user.ts";
import { PrismaUserRepository } from "#/infrastructure/adapters/persistence/prisma-user-repository.ts";
import { BcryptPasswordHasher } from "#/infrastructure/adapters/auth/bcrypt-password-hasher.ts";
import { JwtTokenService } from "#/infrastructure/adapters/auth/jwt-token-service.ts";
import { validate } from "#/infrastructure/http/middleware/validate.ts";

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: password123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Validation error
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Invalid credentials
 */

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

const userRepository = new PrismaUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const tokenService = new JwtTokenService();

const registerUser = new RegisterUser(
  userRepository,
  passwordHasher,
  tokenService,
);
const authenticateUser = new AuthenticateUser(
  userRepository,
  passwordHasher,
  tokenService,
);

export const authRoutes: RouterType = Router();

authRoutes.post("/register", validate(registerSchema), async (req, res) => {
  const result = await registerUser.execute(req.body);
  res.status(201).json({
    message: "Usuario registrado exitosamente",
    user: result.user,
  });
});

authRoutes.post("/login", validate(loginSchema), async (req, res) => {
  const result = await authenticateUser.execute(req.body);
  res.status(200).json(result);
});
