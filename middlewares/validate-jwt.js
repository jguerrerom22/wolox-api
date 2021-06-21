const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const validateJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'Token not provided.'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // Get user according to id
        const user = await User.findById(uid);

        if( !user ) {
            return res.status(401).json({
                msg: 'Token is not valid'
            })
        }

        req.user = user;
        next();

    } catch (error) {

        res.status(401).json({
            msg: 'Token not valid'
        })
    }

}




module.exports = {
    validateJWT
}