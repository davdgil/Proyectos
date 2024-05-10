const { usersModel } = require('../models');
const { matchedData } = require("express-validator")
const bcrypt = require('bcrypt');
const { handleSuccess, handleError } = require('../utils/handleResponses');

const createNewUser = async (req, res) => {
    const data = matchedData(req); 
    console.log(data)
    // en caso de ser un comerciante
    if (req.user) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            data.password = hashedPassword;
            req.user.isActive = true;
            req.user.role = 'merchant'
            const updatedUser = await usersModel.findOneAndUpdate(
                { email: req.user.email },
                data,
                { new: true, runValidators: true }
            );
            handleSuccess(res, "Usuario comerciante actualizado con éxito", updatedUser, 201);
        } catch (error) {
            handleError(res, "Error al actualizar usuario comerciante", 400);
        }
    } else {
        try {
            // Crea un nuevo usuario con la contraseña ya encriptada
            const newUser = new usersModel(data);
            newUser.password = await bcrypt.hash(newUser.password, 10);  // Encriptar la contraseña
            await newUser.save();
            handleSuccess(res, "Nuevo usuario creado exitosamente", newUser, 201);
        } catch (error) {
            console.error(error);
            handleError(res, 'Error al crear el usuario', 500);
        }
    }
};

const createMerchantCONTROLLER = async (email) => {
    const newMerchant = new usersModel({
        email: email,    // Establece el email
        isActive: false, // Comerciante no activo inicialmente
        role: "merchant" // Rol específico como comerciante
    });
    try {
        await newMerchant.save();
        console.log("comerciante creado con éxito")
        return newMerchant;
       
    } catch (err) {
        console.log('Error al crear el comerciante' )
        console.log(err)
        return null;
        
    }

}


const existingUserGET = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await usersModel.findOne({ email });
        if (user) {
            res.status(200).json({
                message: 'Usuario existente',
                user: {
                    email: user.email,
                    role: user.role,
                    isActive: user.isActive
                }
            });
        } else {
            handleError(res, 'Usuario no encontrado', 404);
        }
    } catch (error) {
        console.error(error);
        handleError(res, 'Error interno al verificar el usuario', 500);
    }
};




module.exports = { createNewUser, existingUserGET, createMerchantCONTROLLER };
