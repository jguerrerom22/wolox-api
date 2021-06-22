
const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT, validateFields } = require('../middlewares');
const { usernameExists } = require('../helpers/db-validators');
const { createUser, addUserCoin } = require('../controllers/users');

const router = Router();

/**
 * {{url}}/api/users
 */

// Create User
router.post('/',[
    check('firstName', 'firstName must not be empty').not().isEmpty(),
    check('lastName', 'lastName must not be empty').not().isEmpty(),
    check('username').custom(usernameExists),
    check('password', 'Password must have more than 5 characters').isLength({ min: 6 }),
    check('currency', 'Currency not valid').isIn(['ARS','USD', 'EUR']),
    validateFields
], createUser );

// Add coin to user
router.patch('/coin', [
    validateJWT,
    check('coin', 'Coin must not be empty').not().isEmpty().isString(),
    validateFields
], addUserCoin);

module.exports = router;