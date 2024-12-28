const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  pokemon_name: {
    type: String,
    required: true
  }
});

const caughtpokemon = mongoose.model('caughtpokemon', Schema);
module.exports = caughtpokemon;