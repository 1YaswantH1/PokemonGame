const express = require("express")
const path = require("path")
const app = express()

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Pokemon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB Successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "stylesheets")))
app.use(express.static(path.join(__dirname, "images")))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("javascripts"))

// Homepage
app.get("/", (req, res) => {
    res.render("pokemon.ejs")
})

app.get('/signup', (req, res) => {
    res.render("signup.ejs",{errorMsg:""})
});

app.get('/login', (req, res) => {
    res.render("login.ejs",{errorMsg:""})
});

// signup-post
app.post('/signup', async (req, res) => {
    try {
        let data = req.body;
        data.password=bcrpt.hash(data.password,4)
        console.log(data);
        if (data.password!=data.confirm-password){
            res.render("signup.ejs", {signin:true, errorMsg: "Password & Confirm Password Dosen't Match" });

        }
        const existingUser = await Auth.findOne({ username: data.username });
        if (existingUser) {
            console.log("User exists");
            res.render("signup.ejs", {signin:true, errorMsg: "Username already exists. Try another one." });
        } else {
        
            let savedData = await new Auth({
                username: data.username,
                password: data.password,
            }).save();

            console.log(savedData);
            res.render("pokemon.ejs");
        }
    } catch (error) {
        console.error(error);
        res.render("signup.ejs", { errorMsg: "An error occurred. Please try again later." });
    }
});

let bcrpt = require("bcrypt")
app.post("/login",async(req,res)=>{
    try {
        let data = req.body;
        console.log(data);
       
        const Database = await Auth.findOne({ username: data.email });
        if (bcrpt.compare(data.password,Database.password)){
            res.render("pokemon.ejs")
        }
        else{
        res.render("login.ejs",{errorMsg:"Incorrect username or password "})  }      
    } catch (error) {
        console.error(error);
        res.render("login.ejs", { errorMsg: "An error occurred. Please try again later." });
    }
})

let port = 3000
app.listen(port, () => {
    console.log("server started", port)
})