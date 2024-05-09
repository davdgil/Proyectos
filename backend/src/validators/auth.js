const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorRegister = [
    check('email')
        .exists()
        .withMessage('El campo email es requerido')
        .isEmail()
        .withMessage('Debe ser un email válido'),
    check('password')
        .exists()
        .withMessage('El campo password es requerido')
        .isLength({ min: 4 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('city')
        .exists()
        .withMessage('El campo city es requerido')
        .not()
        .isEmpty()
        .withMessage('El campo city no puede estar vacío'),
    check('interests')
        .optional()
        .isString()
        .withMessage('Los intereses deben ser un String'),
    check('date')
        .optional()
        .isISO8601()
        .withMessage('La fecha de nacimiento debe ser una fecha válida'),
    check('offers')
        .optional()
        .isBoolean()
        .withMessage('El campo offers debe ser booleano'),
    check('role')
        .optional()
        .isIn(['admin', 'merchant', 'usuario', 'anonimo'])
        .withMessage('El rol no es válido'),


    (req, res, next) => {
        validateResults(req, res, next);
    }
];


module.exports = { validatorRegister };
