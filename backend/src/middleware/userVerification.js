const { usersModel } = require('../models');

const userVerification = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await usersModel.findOne({ email });

        if (!user) {
            console.log("crear un nuevo usuario")
            next();
        } else {
            if (!user.isActive && user.role === "merchant") {
                console.log("crear un nuevo comerciante")
                user.isActive = true;
                await user.save();
                req.user = user;
                next();
            } else {
                res.status(409).json({
                    message: 'Usuario ya existente y activo',
                    user: {
                        email: user.email,
                        role: user.role,
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