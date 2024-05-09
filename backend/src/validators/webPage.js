const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validateWebPage = [
    check('commerceId')
        .notEmpty()
        .withMessage('El identificador del comercio es obligatorio.')
        .isMongoId()
        .withMessage('El identificador del comercio no es válido.'),
    check('commerceName')
        .notEmpty()
        .withMessage('El nombre del comercio es obligatorio.'),
    check('title')
        .notEmpty()
        .withMessage('El título es obligatorio.'),
    check('description')
        .notEmpty()
        .withMessage('La descripción es obligatoria.'),
    check('city')
        .notEmpty()
        .withMessage('La ciudad es obligatoria.'),
    check('address')
        .notEmpty()
        .withMessage('La dirección es obligatoria.'),
    check('photos')
        .isArray()
        .withMessage('Las fotos deben estar en un arreglo.'),
    check('photos.*.url')
        .notEmpty()
        .withMessage('La URL de cada foto es obligatoria.'),
    check('photos.*.description')
        .optional()
        .isLength({ max: 200 })
        .withMessage('La descripción de la foto no debe superar los 200 caracteres.'),
        (req, res, next) => {
            validateResults(req, res, next);
        }
]

module.exports = { validateWebPage}