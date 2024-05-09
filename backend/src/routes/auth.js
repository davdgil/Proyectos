const express = require("express");
const router = express.Router();
const { createNewUser, existingUserGET} = require('../controllers/auth');
const { userVerification,} = require('../middleware/userVerification')
const { existingUserPOST, verifyPassword, generateToken } = require('../middleware/login')
const { validatorRegister } = require('../validators/auth')

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *       400:
 *         description: Datos de entrada inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/register", validatorRegister, userVerification, createNewUser);




/**
 * @swagger
 * /auth/existingUser:
 *   get:
 *     summary: Verifica si un usuario existe
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         required: true
 *         description: El email del usuario a verificar.
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/existingUser", existingUserGET);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica a un usuario y retorna un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente, retorna JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login exitoso y token generado"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwicm9sZSI6InVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.QdRn4OzQ6-IvmFw2Nn13n7a5G1NWRwnDnHxHZS2XtkU"
 *       401:
 *         description: Autenticación fallida, contraseña incorrecta.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */

router.post('/login', existingUserPOST, verifyPassword, generateToken )


module.exports = router;
