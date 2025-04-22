const express = require("express");
const { register, login, getUser, forgetPassword } = require("../../controllers/v1/authController");
const authenticateToken = require("../../middlewares/authMiddleware");
const { checkEmail } = require("../../controllers/v1/utilsController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints for managing authentication.
 */

/**
 * @swagger
 * /api/v1/auth/register:
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
 * /api/v1/auth/login:
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
 * /api/v1/auth/auth:
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

/**
 * @swagger
 * /api/v1/auth/forgetPassword:
 *   post:
 *     summary: Recuperar contraseña
 *     description: Recibe un correo electrónico, valida si existe en la base de datos, genera una nueva contraseña temporal, la actualiza y devuelve la contraseña.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *     responses:
 *       200:
 *         description: Contraseña temporal devuelta exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contraseña actualizada correctamente"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: usuario@example.com
 *                 newPassword:
 *                   type: string
 *                   example: "bhBHVG6j"
 *       400:
 *         description: El correo no existe o faltan datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El correo no está registrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al recuperar la contraseña"
 */
router.post("/forgetPassword", forgetPassword);

module.exports = router;