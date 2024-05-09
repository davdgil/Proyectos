const express = require("express");
const router = express.Router();

const { authMiddleware} = require('../middleware/session')
const { checkRole } = require('../middleware/role')


const {
    getAllUsers,
    getUserById,
    deleteAllUsers,
    deleteUserById,
    updateUser,
  } = require('../controllers/user');



/**
 * @swagger
 * /user/getAllUsers:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a list of all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
  router.get('/getAllUsers',authMiddleware,checkRole(['admin']), getAllUsers);

/**
 * @swagger
 * /user/getUserById/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Retrieve a user by their ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
  router.get('/getUserById/:id',authMiddleware,checkRole(['admin']), getUserById);
  
/**
 * @swagger
 * /user/deleteAllUsers:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: All users were deleted.
 *       500:
 *         description: Internal server error
 */

  router.delete('/deleteAllUsers',authMiddleware,checkRole(['admin']), deleteAllUsers);
  
 /**
 * @swagger
 * /user/deleteUserById/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Elimina a un usuario por ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: User was deleted.
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

  router.delete('/deleteUserById/:id',authMiddleware,checkRole(['admin']), deleteUserById);
  
/**
 * @swagger
 * /user/updateUserById/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Actualiza un usuario
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User successfully updated
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
  router.put('/updateUserById/:id',authMiddleware,checkRole(['admin']), updateUser);



module.exports = router