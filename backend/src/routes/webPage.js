const express = require("express");
const router = express.Router();
const { checkRole } = require('../middleware/role');
const { authMiddleware } = require('../middleware/session');
const { existingWebPage } = require('../middleware/webPage')
const { existingCommerceWebPage, createWebPage,deleteWebPage, updateReview,updateLikesDislikes, deleteWebPageByCommerceName } = require('../controllers/webPage');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { uploadImages } = require('../utils/storage');

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
router.get('/getWebPage/:merchantId', authMiddleware, checkRole(['merchant', 'admin', 'usuario', 'anonimo']), existingCommerceWebPage);

/**
 * @swagger
 * /webPage/review/{id}:
 *   put:
 *     summary: Actualiza una reseña en una página web
 *     tags: [WebPage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la página web en la que se actualizará la reseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: El ID del usuario que deja la reseña
 *               comment:
 *                 type: string
 *                 description: El comentario de la reseña
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reseña actualizada correctamente
 *       400:
 *         description: El usuario ya ha dejado una reseña para esta página web
 *       500:
 *         description: Error interno del servidor
 */
router.put('/review/:id', authMiddleware, checkRole(['usuario']), updateReview);
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

router.post('/upload-images',authMiddleware, checkRole(['merchant']), existingWebPage, upload.array('images'), createWebPage);
    


/**
 * @swagger
 * /webPage/delete/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Elimina una página web específica
 *     tags: [WebPage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la página web a eliminar
 *     responses:
 *       200:
 *         description: Página web eliminada correctamente
 *       404:
 *         description: Página web no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/delete/:id', authMiddleware, checkRole(['merchant']), deleteWebPage);

/**
 * @swagger
 * /webPage/deleteByCommerceName/{commerceName}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes a web page based on the commerce name
 *     tags: [WebPage]
 *     parameters:
 *       - in: path
 *         name: commerceName
 *         required: true
 *         schema:
 *           type: string
 *         description: The commerce name of the web page to delete
 *     responses:
 *       200:
 *         description: Web page deleted successfully
 *       404:
 *         description: Web page not found for the given commerce name
 *       500:
 *         description: Internal server error
 */
router.delete('/deleteByCommerceName/:commerceName', authMiddleware, checkRole(['admin']), deleteWebPageByCommerceName)

/**
 * @swagger
 * /webPage/{id}/likes:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Actualiza los likes y dislikes de una página web
 *     tags: [WebPage]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la página web
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [like, dislike]
 *                 description: La acción a realizar (like o dislike)
 *               userId:
 *                 type: string
 *                 description: El ID del usuario que realiza la acción
 *     responses:
 *       200:
 *         description: Acción realizada correctamente (like o dislike)
 *       400:
 *         description: Acción inválida o el usuario ya realizó esta acción/opuesta
 *       404:
 *         description: Página web no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id/likes', authMiddleware, checkRole(['usuario']), updateLikesDislikes);


module.exports = router;
