const { Router } = require('express');
const { validateJWT } = require('../middlewares');
const { getAllCoins, getMyCoins } = require('../controllers/coins');

const router = Router();

/**
 * {{url}}/api/coins
 */

// Get coins markets
router.get('/all', [validateJWT], getAllCoins);

// Get coins of user
router.get('/', [validateJWT], getMyCoins);

module.exports = router;