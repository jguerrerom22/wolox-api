const { User } = require('../models');

const usernameExists = async(username = '') => {

    // Verify if username exists
    const usernameExists = await User.findOne({ username });
    if ( usernameExists ) {
        throw new Error(`Username: ${ username }, is already taken`);
    }
}

module.exports = {
    usernameExists,
}
