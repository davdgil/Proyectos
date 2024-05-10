const express = require("express");
const router = express.Router();
const { commerceValidation } = require('../validators/commerce')
const { existingUser} = require('../middleware/user');
const { checkRole } = require('../middleware/role')
const { authMiddleware } = require('../middleware/session')
const { createCommerce, getAllCommerces, getCommerceByID, deleteAllCommerces, deleteCommerceByID, getCommerceByEmailUser, getMerchantWithCommerceById, deleteCommerceByEmail } = require("../controllers/commerce");


/**
 * @swagger
 * /commerce/createCommerce:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Crea un nuevo comercio
 *     tags: [Commerce]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Commerce'
 *     responses:
 *       201:
 *         description: Comercio creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commerce'
 *       400:
 *         description: Datos de entrada inválidos.
 *       403:
 *         description: Acceso prohibido.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/createCommerce',authMiddleware, checkRole(['admin']), commerceValidation, existingUser, createCommerce)

/**
 * @swagger
 * /commerce/getCommerces:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener todos los comercios
 *     tags: [Commerce]
 *     responses:
 *       200:
 *         description: Lista de todos los comercios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commerce'
 *       403:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/getCommerces',authMiddleware, getAllCommerces)


/**
 * @swagger
 * /commerce/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener un comercio por su ID
 *     tags: [Commerce]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comercio a obtener
 *     responses:
 *       200:
 *         description: Detalles del comercio solicitado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commerce'
 *       404:
 *         description: Comercio no encontrado
 *       500:
 *         description: Error interno del servidor
 */

router.get('/:id',authMiddleware, checkRole(['admin']), getCommerceByID);

/**
 * @swagger
 * /commerce/deleteAllCommerces:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes all commerces and their associated merchants
 *     tags: [Commerce]
 *     responses:
 *       200:
 *         description: All commerces and associated merchants successfully deleted.
 *       500:
 *         description: Error occurred during the operation.
 */

router.delete('/deleteAllCommerces',authMiddleware, checkRole(['admin']), deleteAllCommerces);

/**
 * @swagger
 * /commerce/commerceByID/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes a specific commerce and its associated merchant by ID
 *     tags: [Commerce]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the commerce to delete
 *     responses:
 *       200:
 *         description: Commerce and associated merchant successfully deleted.
 *       404:
 *         description: Commerce not found.
 *       500:
 *         description: Error occurred during the operation.
 */

router.delete('/commerceByID/:id',authMiddleware, checkRole(['admin', 'merchant']), deleteCommerceByID);

/**
 * @swagger
 * /commerce/getCommerceByEmail/{email}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtiene los comercios asociados al email de un usuario
 *     tags: [Commerce]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email del usuario para buscar comercios asociados
 *     responses:
 *       200:
 *         description: Lista de comercios encontrados para el email proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commerce'
 *       404:
 *         description: No se encontraron comercios para este usuario
 *       500:
 *         description: Error interno del servidor
 */
router.get('/getCommerceByEmail/:email', authMiddleware, checkRole(['admin', 'merchant']), getCommerceByEmailUser);

/**
 * @swagger
 * /commerce/getMerchant/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Obtener el comerciante asociado a un comercio por ID
 *     tags: [Commerce]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comercio para obtener el comerciante asociado
 *     responses:
 *       200:
 *         description: Devuelve el ID del comerciante asociado al comercio.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 merchantId:
 *                   type: string
 *                   description: El ID del comerciante asociado al comercio.
 *       404:
 *         description: Comercio no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/getMerchant/:id', authMiddleware, checkRole(['admin', 'merchant', 'usuario', 'anonimo']), getMerchantWithCommerceById);

/**
 * @swagger
 * /commerce/deleteCommerceByEmail/{email}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Deletes a specific commerce and its associated merchant by email
 *     tags: [Commerce]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the commerce to delete
 *     responses:
 *       200:
 *         description: Commerce and associated merchant successfully deleted.
 *       404:
 *         description: Commerce not found.
 *       500:
 *         description: Internal server error occurred during the operation.
 */

router.delete('/deleteCommerceByEmail/:email', authMiddleware, checkRole(['admin', 'merchant']), deleteCommerceByEmail);


module.exports = router;