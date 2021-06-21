const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is mandatory']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is mandatory']
    },
    username: {
        type: String,
        required: [true, 'username is mandatory'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is mandatory'],
    },
    currency: {
        type: String,
        required: true,
        default: 'USD',
        enum: ['EUR', 'USD', 'ARS']
    },
    coins: {
        type: [String],
        required: false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);
