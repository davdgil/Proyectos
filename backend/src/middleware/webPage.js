const { webPageModel } = require("../models");

const existingWebPage = async (req, res, next) => {
    try {
        console.log("Verificando pagina web existente...")
        const { commerceId } = req.body;
        const commerce = await webPageModel.findOne({ commerceId });
        if (commerce) {
            console.log("Pagina web ya existente");
            return res.status(409).json({ message: 'Pagina web ya creado' }); 
        } else {
            console.log("Creando Pagina web...")
            next(); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al verificar Pagina web' });
    }
};

module.exports = { existingWebPage }
