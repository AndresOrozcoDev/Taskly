const express = require("express");
const { register, login, getUser } = require("../../controllers/authController");
const authenticateToken = require("../../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints for managing authentication.
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Autenticación]
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
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               rol:
 *                 type: string
 *                 example: "admin"
 *                 description: "Rol del usuario (opcional, por defecto 'user')"
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error al registrar usuario
 */
router.post("/register", register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión
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
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *       400:
 *         description: Credenciales incorrectas
 */
router.post("/login", login);

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Obtiene el usuario autenticado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario autenticado
 *       401:
 *         description: Token no válido o expirado
 */
router.get("/auth", authenticateToken, getUser);

module.exports = router;