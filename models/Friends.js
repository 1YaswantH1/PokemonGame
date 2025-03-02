const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    friends: {
        type: [String],
        required: true,
        default: [],

    }
});

const Auth = mongoose.model('Friends', Schema);
module.exports = Auth;