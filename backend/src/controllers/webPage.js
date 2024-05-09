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

const createWebPage = async (req, res) => {
  try {
    const webpage = new webPageModel({
      merchantId: req.body.merchantId,
      commerceName: req.body.commerceName,
      title: req.body.title,
      description: req.body.description,
      city: req.body.city,
      address: req.body.address,
      likes: 0,
      dislikes: 0,
      reviews: [],
      photos: []
    });
    console.log(webpage)
    const imageUrls = await uploadImages(req.files);
    webpage.photos = imageUrls.map(url => ({ url }));
    await webpage.save();
    res.status(201).json({ message: 'Web page created successfully', webpage });
  } catch (error) {
    console.error('Error creating web page:', error);
    res.status(500).send(error.message);
  }
};


const deleteWebPage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPage = await webPageModel.findOneAndDelete({ merchantId: id });
    if (!deletedPage) {
      return res.status(404).json({ message: "Web page not found" });
    }
    console.log("pagine web eliminada")
    res.status(200).json({ message: 'Web page deleted successfully' });
  } catch (error) {
    console.error('Error deleting web page:', error);
    res.status(500).send(error.message);
  }
};

module.exports = { existingCommerceWebPage, createWebPage, deleteWebPage };

