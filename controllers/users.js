const { response } = require('express');
const bcryptjs = require('bcryptjs');
const coingecko = require('../helpers/coingecko-api');
const { generateJWT } = require('../helpers');
const User = require('../models/user');

// Create user
const createUser = async(req, res = response) => {
    
    const { firstName, lastName, username, password, currency } = req.body;
    const user = new User({ firstName, lastName, username, password, currency });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    user.coins = [];

    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({ user, token });
}

// Add coin to user
const addUserCoin = async(req, res = response) => {
    const { coin } = req.body;

    const user = await User.findById(req.user.id);

    if (user.coins.includes(coin)) {
        return res.status(409).json({
            msg: `Coin ${coin} is already added`
        });
    }

    // Check if coin is valid
    coingecko.get(`/coins/${coin}`)
        .then(async () => {

            user.coins.push(coin);
            await user.save();

            res.status(204).json();
        })
        .catch(() => {
            
            return res.status(404).json({
                msg: `Coin ${coin} is not valid`
            });
        });
}

module.exports = {
    createUser,
    addUserCoin
}