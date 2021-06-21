const { response } = require('express');
const bcryptjs = require('bcryptjs')
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');

const login = async(req, res = response) => {

    const { username, password } = req.body;

    try {
      
        // Verify if user exists
        const user = await User.findOne({ username });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Username or password incorrect'
            });
        }

        // Verify Password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Username or password incorrect'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({ user, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Please contact with the administrator.'
        });
    }
}

const validateUserToken = async (req, res = response ) => {

    // Generate JWT
    const token = await generateJWT(req.usuario._id);
    
    res.json({
        user: req.user,
        token: token,
    })
}

module.exports = {
    login,
    validateUserToken
}
