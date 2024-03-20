const { validationResult, check } = require('express-validator');

exports.registerValidate = () => [
    check('Firstname', 'Firstname is required').notEmpty(),
    check('Lastname', 'Firstname is required').notEmpty(),
    check('Mail', 'Firstname is required').isEmail(),
    check('PhoneNumber', 'Firstname is required').notEmpty(),
    check('Birthdate', 'Firstname is required').notEmpty(),

];
exports.validation = (req, res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array()});
    }
    next();
}