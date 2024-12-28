const app = express()
const path = require("path")
const bcrypt = require('bcrypt'); 
const dotenv = require("dotenv")
const express = require("express")
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB Successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));


const Auth=require("./models/Auth")

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("javascripts"))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "stylesheets")))
app.use(express.static(path.join(__dirname, "images")))
app.use(express.static(path.join(__dirname, 'public')));

// Homepage
app.get("/home", (req, res) => {
    res.render("pokemon.ejs")
})

app.get('/signup', (req, res) => {
    res.render("signup.ejs",{errorMsg:""})
});

app.get('/login', (req, res) => {
    res.render("login.ejs",{errorMsg:""})
});


// signup-request handling
app.post('/signup', async (req, res) => {
    try {
        let data = req.body;
        console.log(data);
        if (data.password !== data.confirmpassword) {
            return res.render("signup.ejs", { errorMsg: "Password & Confirm Password doesn't match." });
        }
        const existingUser = await Auth.findOne({ username: data.email });
        if (existingUser) {
            console.log("User exists");
            return res.render("signup.ejs", { errorMsg: "Username already exists. Try another one." });
        }
        const hashedPassword = await bcrypt.hash(data.password, 5);  
        const savedData = await new Auth({
            username: data.email,
            password: hashedPassword,
        }).save();

        console.log(savedData);
        res.render("pokemon.ejs");
    } catch (error) {
        console.error(error);
        res.render("signup.ejs", { errorMsg: "An error occurred. Please try again later." });
    }
});

// login-request handling
app.post("/login",async(req,res)=>{
    try {
        let data = req.body;
        console.log(data);   
        const Database = await Auth.findOne({ username: data.email });
        if (await bcrpt.compare(data.password,Database.password)){
            res.redirect("/home")
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