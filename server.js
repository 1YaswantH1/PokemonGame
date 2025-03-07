const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");

dotenv.config({ path: './config.env' });

const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(session({
    secret: "pikachu",
    resave: false,
    saveUninitialized: false,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "stylesheets")));
app.use(express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("javascripts"));

// Import routes
const authRoutes = require("./public/routes/authRoutes");
const pokemonRoutes = require("./public/routes/pokemon");

// Use routes
app.use(authRoutes);
app.use(pokemonRoutes);

let port = 3000;
app.listen(port, () => {
    console.log("Server started on port", port);
    console.log(`Open http://localhost:${port} in your browser`);
});
