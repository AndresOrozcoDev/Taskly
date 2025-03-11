const express = require('express');
const router = express.Router();
const officeController = require('../../controllers/officeController/office');

/**
 * @swagger
 * components:
 *   schemas:
 *     Office:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autogenerado de la oficina
 *         name:
 *           type: string
 *           description: Nombre de la oficina
 *       example:
 *         id: 1
 *         name: "Main Office"
 */

/**
 * @swagger
 * /api/v1/offices:
 *   get:
 *     summary: Obtener todas las oficinas
 *     tags: [Office]
 *     responses:
 *       200:
 *         description: Lista de todas las oficinas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Office'
 */
router.get('/', officeController.getAllOffices);

/**
 * @swagger
 * /api/v1/offices:
 *   post:
 *     summary: Crear una nueva oficina
 *     tags: [Office]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Office"
 *     responses:
 *       201:
 *         description: Oficina creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       400:
 *         description: Error de validación
 */
router.post('/', officeController.createOffice);

/**
 * @swagger
 * /api/v1/offices/{id}:
 *   delete:
 *     summary: Eliminar una oficina por ID
 *     tags: [Office]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la oficina a eliminar
 *     responses:
 *       200:
 *         description: Oficina eliminada exitosamente
 *       404:
 *         description: Oficina no encontrada
 */
router.delete('/:id', officeController.deleteOffice);

module.exports = router;
