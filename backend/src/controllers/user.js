

const { usersModel, commercesModel } = require('../models');
const { handleError } = require('../utils/handleResponses');

const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.find();
        res.status(200).json(users);
    } catch (error) {
        handleError(res, 'Internal server error', 500);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await usersModel.findById(req.params.id);
        if (!user) {
            handleError(res, 'Usuario no encontrado', 404);
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        handleError(res, 'Error interno del servidor', 500);
    }
};

const deleteAllUsers = async (req, res) => {
    try {
        const merchants = await usersModel.find({ role: 'merchant', isActive: true });
        const merchantIds = merchants.map(merchant => merchant._id);
        if (merchantIds.length > 0) {
            await commercesModel.deleteMany({ merchant: { $in: merchantIds } });
        }
        await usersModel.deleteMany();
        res.status(200).json({ message: 'Todos los usuarios y comercios asociados han sido eliminados' });
    } catch (error) {
        handleError(res, 'Error interno del servidor', 500);
    }
};

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await usersModel.findById(id);
        console.log(user)
        if (!user) {
            console.log('usuario no encontrado')
            handleError(res, 'Usuario no encontrado', 404);
            return;
        }
        if (user.role === 'merchant') {
            await commercesModel.findOneAndDelete({ merchant: id });
        }
        await usersModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'User and any associated commerce successfully deleted.' });
    } catch (error) {
        handleError(res, 'Internal server error', 500);
    }
};

const updateUser = async (req, res) => {
    try {
        const user = await usersModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            handleError(res, 'Usuario no encontrado', 404);
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        handleError(res, 'Internal server error', 500);
    }
};

module.exports = { getAllUsers, getUserById, deleteAllUsers, deleteUserById, updateUser };
