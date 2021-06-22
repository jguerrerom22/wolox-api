const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');
const { login, validateUserToken } = require('../controllers/auth');

const router = Router();

/**
 * {{url}}/api/auth
 */

// Login for user
router.post('/login',[
    check('username', 'Username must not be empty').not().isEmpty(),
    check('password', 'Password must not be empty').not().isEmpty(),
    validateFields
],login );

// Validate if token is valid
router.get('/',[
    validateJWT
], validateUserToken );

module.exports = router;