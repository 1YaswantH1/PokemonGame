const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,

    }
});

const Auth = mongoose.model('Auth', Schema);
module.exports = Auth;