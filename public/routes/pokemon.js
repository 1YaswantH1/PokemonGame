const express = require("express");
const router = express.Router();
const pokemon_caught = require("../../models/pokemon-caught");
const Auth = require("../../models/Auth");
const Friends = require("../../models/Friends");

// GET Signup route
router.get('/signup', (req, res) => {
    if (req.session.user) {
        return res.status(401).redirect("/home");
    }
    res.render("signup.ejs", { errorMsg: null });
});
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.status(401).redirect("/home");
    }
    res.render("login.ejs", { errorMsg: null });
});
router.get('/home', (req, res) => {
    if (!req.session.user) {
        return res.status(401).redirect("/login");
    }
    res.render("pokemon.ejs", { errorMsg: null });
});
router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.status(401).redirect("/login");
    }
    return res.status(401).redirect("/home");
});

// Save Pokémon
router.post('/try', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).redirect("/login");
        }
        const { type, pokemon_name } = req.body;
        const user = await Auth.findById(req.session.user.id);
        if (!user) return res.status(404).send({ message: "User not found" });

        let caughtPokemon = await pokemon_caught.findOne({ username: user.username });
        if (caughtPokemon) {
            caughtPokemon.pokemon_name.push(`${type} ${pokemon_name}`);
            await caughtPokemon.save();
        } else {
            const newPokemon = new pokemon_caught({
                username: user.username,
                pokemon_name: [`${type} ${pokemon_name}`]
            });
            await newPokemon.save();
        }

        res.status(200).send({ message: "Pokemon saved successfully" });
    } catch (error) {
        console.error("Error saving Pokémon:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

// Display Pokémon
router.get('/yourpokemon', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).redirect("/login");
        }
        const pokemonData = await pokemon_caught.findOne({ username: req.session.user.username });
        let pokemonList = pokemonData ? pokemonData.pokemon_name : [];
        pokemonList = pokemonList.reverse(); // Sort the list in reverse order
        res.render("yourpokemon.ejs", { pokemonList });
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

// Release Pokémon
router.post('/release', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).redirect("/login");
        }
        const { type, pokemon_name } = req.body;
        const user = await Auth.findById(req.session.user.id);
        if (!user) return res.status(404).send({ message: "User not found" });

        let caughtPokemon = await pokemon_caught.findOne({ username: user.username });
        if (caughtPokemon) {
            caughtPokemon.pokemon_name = caughtPokemon.pokemon_name.filter(pokemon => pokemon !== `${type} ${pokemon_name}`);
            await caughtPokemon.save();
        }

        res.status(200).send({ message: "Pokemon released successfully" });
    } catch (error) {
        console.error("Error releasing Pokémon:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

router.post("/addFriends", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).redirect("/login");
        }
        const { friend } = req.body;
        const user = await Friends.findById(req.session.user.id);
        if (!user) return res.status(404).send({ message: "User not found" });

        if (!user.friends.includes(friend)) {
            user.friends.push(friend);
            await user.save();
        }

        res.status(200).send({ message: "Friend Added Successfully" });
    } catch (error) {
        console.error("Something Went Wrong Try Again:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

router.get("/searchFriends", async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).redirect("/login");
        }
    } catch (error) {
        console.error("Something Went Wrong Try Again:", error);
        res.status(500).send({ message: "Internal server error" });
    }

})



module.exports = router;