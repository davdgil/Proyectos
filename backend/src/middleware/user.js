const { usersModel } = require('../models');
const { handleError } = require('../utils/handleResponses');

const existingUser = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await usersModel.findOne({ email });
        if (user) {
            console.log("usuario/comercio existente");
            handleError(res, 'Usuario/Comercio existente', 409); // Cambiado a 409 Conflicto, ya que 404 no es adecuado para un usuario existente.
        } else {
            console.log("email disponible");
            next();
        }
    } catch (error) {
        console.error(error);
        handleError(res, 'Error interno al verificar el usuario', 500);
    }
};

module.exports = { existingUser };
