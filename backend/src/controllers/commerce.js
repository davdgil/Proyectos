const { commercesModel, usersModel } = require('../models');
const { createMerchantCONTROLLER } = require('./auth');
const { matchedData } = require('express-validator');
const { handleError } = require('../utils/handleResponses');

const getMerchantWithCommerceById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id)
        const commerce = await commercesModel.findById(id);
        if (!commerce) {
            console.log(`No se encontró el comercio con ID: ${id}`);
            return res.status(404).json({ message: 'Commerce not found' });
        }

        console.log(`Comerciante encontrado para el comercio con ID: ${id}`, commerce.merchant);
        res.status(200).json({ merchantId: commerce.merchant });
    } catch (error) {
        console.error('Error al obtener el comerciante del comercio:', error);
        handleError(res, 'Error interno al obtener el comerciante del comercio', 500);
    }
};


const createCommerce = async (req, res) => {
    const data = matchedData(req);
    try {
        // Verifica si ya existe un comercio con el mismo CIF
        const existingCommerce = await commercesModel.findOne({ cif: data.cif });
        if (existingCommerce) {
            console.log("El CIF ya está registrado");
            handleError(res, "El CIF ya está registrado", 400);
            return;
        }

        // Crear comerciante si no existe ya
        const merchant = await createMerchantCONTROLLER(data.email);
        if (!merchant) {
            console.log("No se pudo crear el comerciante");
            handleError(res, "No se pudo crear el comerciante", 400);
            return;
        }

        // Crear comercio
        const newCommerce = new commercesModel({
            ...data,
            merchant: merchant._id
        });

        await newCommerce.save();
        console.log("Comercio creado");
        res.status(201).json({ message: 'Comercio y comerciante creados con éxito', commerce: newCommerce });
    } catch (error) {
        console.error('Error interno al crear el comercio y comerciante:', error);
        handleError(res, 'Error interno al crear el comercio y comerciante', 500);
    }
};


const getAllCommerces = async (req, res) =>{
    try {
        const data = await commercesModel.find({})
        res.send(data)
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_COMMERCES', 403)
    }
}

const getCommerceByID = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const data = await commercesModel.findById(id);
      if (!data) {
        handleHttpError(res, 'Commerce not found', 404);
        return;
      }
      res.send(data);
    } catch (error) {
      handleHttpError(res, 'ERROR_GET_COMMERCE', 404);
    }
  };

  const getCommerceByEmailUser = async (req, res) =>{
    const { email } = req.params

    try {
        const commerces = await commercesModel.find({email})
        if (commerces.length > 0) {
            res.json({ success: true, commerces });
        } else {
            handleHttpError(res, 'No se han encontrados comercios para este usuario', 404);
        }
    } catch (error) {
        console.error('Error en el servidor')
        handleHttpError(res, 'Error interno en el servidor', 500);
    }
  }


  const deleteAllCommerces = async (req, res) => {
    try {
        //encontramos todos los comercios y sus merchant ID
        const commerces = await commercesModel.find({});
        const merchantIds = commerces.map(commerce => commerce.merchant);

        //borramos todos los comerciantes
        await usersModel.deleteMany({
            _id: { $in: merchantIds }
        });

        //borramos todos los comercios
        await commercesModel.deleteMany({});

        res.status(200).json({ message: "todos los comercios y comerciantes asociados han sido eliminados" });
    } catch (error) {
        handleError(res, 'Error al eliminar todos los comercios', 500);
    }
};

const deleteCommerceByID = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const commerce = await commercesModel.findById(id);
        console.log(commerce)

        if (!commerce) {
            handleError(res, 'Commerce not found', 404);
            return;
        }

        // Borramos el comerciante asociado
        await usersModel.findByIdAndDelete(commerce.merchant);

        // Borramos el comercio
        await commercesModel.findByIdAndDelete(id);

        res.status(200).json({ message: `Comercio y comerciante con ID ${id} han sido borrados.` });
    } catch (error) {
        handleError(res, 'Error al eliminar comercio por ID', 500);
    }
};




module.exports = { createCommerce, getAllCommerces, getCommerceByID, deleteAllCommerces, deleteCommerceByID, getCommerceByEmailUser, getMerchantWithCommerceById };
