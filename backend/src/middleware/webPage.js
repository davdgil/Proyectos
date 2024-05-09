const { webPageModel } = require("../models");

const existingWebPage = async (req, res, next) => {
    try {
        const { id } = req.body; // Asumiendo que esto es parte del body en una solicitud POST.
        console.log("Verificando la existencia de la página web para commerceId:", id);
        
        const existingPage = await webPageModel.findOne({ merchantId: id });
        if (existingPage) {
            console.log("Una página web ya existe para el commerceId proporcionado.");
            return res.status(409).json({ message: 'Una página web ya existe para este comercio.' });
        }
        
        console.log("No se encontró una página web existente, procediendo...");
        next();
    } catch (error) {
        console.error("Error al verificar la existencia de la página web:", error);
        res.status(500).json({ error: 'Error interno al verificar la existencia de la página web.' });
    }
};

module.exports = { existingWebPage };
