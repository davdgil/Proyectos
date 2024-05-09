// controllers/webPage.js

const { matchedData } = require('express-validator');
const { webPageModel } = require('../models');
const { handleError } = require('../utils/handleResponses');
const { uploadImages } = require('../utils/storage');

const existingCommerceWebPage = async (req, res) =>{
  try {
    const { merchantId } = req.params;
    console.log(merchantId)
    const page = await webPageModel.findOne({ merchantId : merchantId });
    
    if (page) {
      console.log("Pagina web existente")
      res.status(200).json({ exists: true, page });
    } else {
      console.log("Pagina web no existente")
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error al verificar la existencia de la página web:', error);
    handleError(res, "Error interno en el servidor", 500);
  }
}

const createOrUpdateWebPage = async (req, res) => {
  try {
    let webpage;
    if (req.body.webpageId) {
        // Si se proporciona un webpageId, encuentra la página web existente
        webpage = await WebPage.findById(req.body.webpageId);
        if (!webpage) {
            return res.status(404).send('WebPage not found');
        }
    } else {
        // Si no se proporciona un webpageId, crea una nueva WebPage
        webpage = new webPageModel({
            merchantId: req.body.merchantId,
            commerceName: req.body.commerceName,
            title: req.body.title,
            description: req.body.description,
            city: req.body.city,
            address: req.body.address,
            likes: 0,  // Inicia con valores predeterminados
            dislikes: 0,
            reviews: [],  // Sin revisiones inicialmente
            photos: []  // Sin fotos inicialmente
        });
        await webpage.save();
    }

    // Sube las imágenes y actualiza el documento WebPage
    const imageUrls = await uploadImages(req.files);
    webpage.photos.push(...imageUrls.map(url => ({ url })));
    await webpage.save();

    res.status(200).json({ message: 'Images uploaded and saved successfully', webpage });
} catch (error) {
    console.error('Error handling image upload:', error);
    res.status(500).send(error.message);
}

};

module.exports = { existingCommerceWebPage, createOrUpdateWebPage }

