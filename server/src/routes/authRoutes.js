const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

const validateSignup = [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number must be exactly 10 digits').isLength({ min: 10, max: 10 }).isNumeric(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

const validateLogin = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/signup', validateSignup, handleValidationErrors, authController.signup);
router.post('/login', validateLogin, handleValidationErrors, authController.login);

module.exports = router;
