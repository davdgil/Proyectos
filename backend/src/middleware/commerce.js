const { commercesModel } = require("../models");

const existingCommerce = async (req, res, next) => {
    try {
        console.log("Verificando comercio existente...")
        const { email } = req.body;
        const commerce = await commercesModel.findOne({ email });
        if (commerce) {
            console.log("Comercio ya existente");
            return res.status(409).json({ message: 'Comercio ya creado' }); // Retorna y detiene el middleware
        } else {
            console.log("Creando comercio...")
            next(); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al verificar el comercio' });
    }
};

module.exports = { existingCommerce }
