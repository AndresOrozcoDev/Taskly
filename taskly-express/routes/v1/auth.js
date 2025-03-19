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
 * /v1/auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
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
 * /v1/auth/login:
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
 * /v1/auth/auth:
 *   get:
 *     summary: Obtiene el usuario autenticado
 *     description: Retorna la información del usuario autenticado si el token es válido.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "123456"
 *                     email:
 *                       type: string
 *                       example: "usuario@example.com"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *       401:
 *         description: Acceso denegado (Token no proporcionado)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Acceso denegado"
 *       403:
 *         description: Token inválido o expirado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido"
 */
router.get("/auth", authenticateToken, getUser);

module.exports = router;