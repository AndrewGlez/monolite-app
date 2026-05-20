import { Router, type Router as RouterType } from "express";
import { z } from "zod";
import { GetProfile } from "#/application/use-cases/user/get-profile.ts";
import { UpdateProfile } from "#/application/use-cases/user/update-profile.ts";
import { ListUsers } from "#/application/use-cases/user/list-users.ts";
import { PrismaUserRepository } from "#/infrastructure/adapters/persistence/prisma-user-repository.ts";
import { authMiddleware } from "#/infrastructure/http/middleware/auth.ts";
import { adminMiddleware } from "#/infrastructure/http/middleware/admin.ts";
import { validate } from "#/infrastructure/http/middleware/validate.ts";

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/users/me:
 *   put:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Updated
 *     responses:
 *       200:
 *         description: Profile updated
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: List all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not admin)
 */

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(1),
  }),
});

const userRepository = new PrismaUserRepository();

const getProfile = new GetProfile(userRepository);
const updateProfile = new UpdateProfile(userRepository);
const listUsers = new ListUsers(userRepository);

export const userRoutes: RouterType = Router();

userRoutes.get("/me", authMiddleware, async (req, res) => {
  const result = await getProfile.execute(req.user.userId);
  res.status(200).json(result);
});

userRoutes.put(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  async (req, res) => {
    const result = await updateProfile.execute(req.user.userId, req.body);
    res.status(200).json(result);
  },
);

userRoutes.get("/", authMiddleware, adminMiddleware, async (_req, res) => {
  const result = await listUsers.execute();
  res.status(200).json(result);
});
