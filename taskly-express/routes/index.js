const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Página de inicio
 *     description: Retorna una vista HTML renderizada con Pug.
 *     responses:
 *       200:
 *         description: Página de inicio renderizada con Pug.
 */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
