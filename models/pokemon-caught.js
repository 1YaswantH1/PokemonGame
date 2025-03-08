const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  pokemon_name: {
    type: [String],
    default: [],
    required: true
  },
});

const caughtpokemon = mongoose.model('caughtpokemon', Schema);
module.exports = caughtpokemon;