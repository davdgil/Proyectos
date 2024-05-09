const express = require("express");
const router = express.Router();
const { checkRole } = require('../middleware/role');
const { authMiddleware } = require('../middleware/session');
const { existingWebPage } = require('../middleware/webPage')
const { existingCommerceWebPage, createOrUpdateWebPage } = require('../controllers/webPage');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { uploadImages } = require('../utils/storage');
const { webPageModel } = require('../models'); 

/**
 * @swagger
 * /webPage/getWebPage/{commerceId}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene la página web de un comercio por ID
 *     tags: [WebPage]
 *     parameters:
 *       - in: path
 *         name: commerceId
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID del comercio cuya página web se desea obtener
 *     responses:
 *       200:
 *         description: Detalles de la página web solicitada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WebPage'
 *       404:
 *         description: Página web no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/getWebPage/:merchantId', authMiddleware, checkRole(['merchant']), existingCommerceWebPage);

/**
 * @swagger
 * /webPage/upload-images:
 *   post:
 *     summary: Crea o actualiza una página web y sube imágenes asociadas
 *     tags: [WebPage]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               webpageId:
 *                 type: string
 *                 description: El ID de la página web a actualizar. Si no se proporciona, se creará una nueva página web.
 *               merchantId:
 *                 type: string
 *                 description: El ID del comerciante asociado a la página web.
 *               commerceName:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Las imágenes a subir.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: La página web fue creada o actualizada correctamente. Devuelve la página web creada o actualizada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WebPage'
 *       400:
 *         description: Datos de entrada inválidos.
 *       404:
 *         description: No se encontró la página web especificada.
 *       500:
 *         description: Error interno del servidor.
 */

router.post('/upload-images',authMiddleware, checkRole(['merchant']), existingWebPage, upload.array('images'), createOrUpdateWebPage);
    

module.exports = router;
