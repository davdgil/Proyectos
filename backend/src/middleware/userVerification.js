const { usersModel } = require('../models');
const { matchedData } = require("express-validator")

const userVerification = async (req, res, next) => {
    try {
        const { email } = matchedData(req);
        console.log(email)
        const user = await usersModel.findOne({ email: email });
       
        if (!user) {
            console.log("crear un nuevo usuario")
            next();
        } else {
            console.log("activar usuario")
            if (!user.isActive && user.role === "merchant") {
                console.log("crear un nuevo comerciante")
                user.isActive = true;
                user.role = 'merchant'
                await user.save();
                req.user = user;
                next();
            } else {
                res.status(409).json({
                    message: 'Usuario ya existente y activo',
                    user: {
                        email: user.email,
                        role: 'usuario',
                        isActive: user.isActive
                    }
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al verificar el usuario' });
    }
};

module.exports = { userVerification }