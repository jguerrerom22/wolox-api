const validateFields = require('./validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

module.exports = {
    ...validateFields,
    ...validateJWT,
}