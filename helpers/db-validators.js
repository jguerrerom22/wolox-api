const { User } = require('../models');

// Verify if username exists
const usernameExists = async(username = '') => {

    const usernameExists = await User.findOne({ username });
    if ( usernameExists ) {
        throw new Error(`Username: ${ username }, is already taken`);
    }
}

module.exports = {
    usernameExists,
}
