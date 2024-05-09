const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const commerceValidation = [
    check('email').isEmail(),
    check('commerceName').not().isEmpty().trim().escape(),
    check('phone').not().isEmpty().trim().escape(),
    check('cif').not().isEmpty().trim().escape(),
    check('address').not().isEmpty().trim().escape(),
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

module.exports = { commerceValidation };