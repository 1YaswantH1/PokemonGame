const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
    user: {
        type: Object,
        required: true
    },

    pokemons: {
        type: [String],
        required: true
    },
});

const caughtpokemon = mongoose.model('caughtpokemon', Schema);
module.exports = caughtpokemon;