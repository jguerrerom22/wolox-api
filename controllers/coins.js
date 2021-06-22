const { response } = require('express');
const coingecko = require('../helpers/coingecko-api');
const { User } = require('../models');

// Get all the coins from coingecko according to the user currency
const getAllCoins = async(req, res = response ) => {

    const { currency } = req.user;
    const { data } = await coingecko.get(`/coins/markets?vs_currency=${currency}`);
    
    res.json(data.map(x => ({
        id: x.id,
        symbol: x.symbol,
        price: x.current_price,
        name: x.name,
        image: x.image,
        last_update: x.last_update
    })));
}

// Get the information of the user coins
const getMyCoins = async (req, res = response) => {

    let { top = 25, order = 'desc' } = req.query;
    if (top > 25) top = 25;

    const user = await User.findById(req.user.id);
    const coins = user.coins.join(',');

    if (coins === '') {
        return res.json([]);
    }

    const urlSearch = `&ids=${coins}&per_page=${top}&page=1&order=market_cap_${order}`;

    const [
        { data: coinsARS },
        { data: coinsUSD },
        { data: coinsEUR}
    ] = await Promise.all([
        coingecko.get(`/coins/markets?vs_currency=ars${urlSearch}`),
        coingecko.get(`/coins/markets?vs_currency=usd${urlSearch}`),
        coingecko.get(`/coins/markets?vs_currency=eur${urlSearch}`)
    ]);

    return res.json(coinsARS.map((ars, i) => ({
        symbol: ars.symbol,
        current_price_ars: ars.current_price,
        current_price_usd: coinsUSD[i].current_price,
        current_price_eur: coinsEUR[i].current_price,
        name: ars.name,
        image: ars.image,
        last_update: ars.last_update
    })));
}

module.exports = {
    getAllCoins,
    getMyCoins
}