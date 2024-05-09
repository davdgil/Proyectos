const { usersModel } = require('../models')
const { signToken } = require('../utils/handleJWT')
const { handleError } = require('../utils/handleResponses')
const bcrypt = require('bcrypt');

const existingUserPOST = async (req, res, next) => {
    try {
        console.log("email")
        const { email } = req.body;
        const user = await usersModel.findOne({ email });
        if (user) {
            console.log("usuario correcto")
            req.user = user; // Adjuntar el usuario al objeto request
            next(); // Pasar el control al siguiente middleware
        } else {
            handleError(res, "Usuario no encontrado", 404);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al verificar el usuario' });
    }
};



const verifyPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const user = req.user;

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            console.log("contraseña correcta")
            next();
        } else {
            handleError(res, "Contraseña incorrecta", 401);
        }
    } catch (error) {
        console.error(error);
        handleError(res, "Error interno al verificar la contraseña", 500);
    }
};


const generateToken = (req, res) => {
    if (!req.user) {
        handleError(res, "Autenticacion fallida, usuario no encontrado", 401);
    }

    const { _id, email, role } = req.user;

    try {
        const token = signToken({
            _id: _id,
            email: email,
            role: role
        });

        res.status(200).json({
            message: 'Login exitoso y token generado',
            token: token
        });
    } catch (error) {
        console.error('Error generando token:', error);
        handleError(res, "Error interno al generar el token", 500);
    }
};




module.exports = { existingUserPOST, verifyPassword, generateToken }