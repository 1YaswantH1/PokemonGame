const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Pokemon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB Successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

let Schema = new mongoose.Schema({
  pokemon_name: {
    type: String,
    required: true
  }
});

const caughtpokemon = mongoose.model('caughtpokemon', Schema);
module.exports = caughtpokemon;