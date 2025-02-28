const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Auth = require("../../models/Auth");


// POST Signup route
router.post('/signup', async (req, res) => {
    try {
        const { email, password, confirmpassword } = req.body;
        if (password !== confirmpassword) {
            return res.render("signup.ejs", { errorMsg: "Password & Confirm Password don't match." });
        }
        const existingUser = await Auth.findOne({ username: email });
        if (existingUser) {
            return res.render("signup.ejs", { errorMsg: "Username already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new Auth({ username: email, password: hashedPassword });
        await newUser.save();
        req.session.user = { username: newUser.username, id: newUser._id };
        res.redirect("/home");
    } catch (error) {
        console.error("Signup Error:", error);
        res.render("signup.ejs", { errorMsg: "Error during signup." });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Auth.findOne({ username: email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render("login.ejs", { errorMsg: "Incorrect username or password." });
        }
        req.session.user = { username: user.username, id: user._id };
        res.redirect("/home");
    } catch (error) {
        console.error("Login Error:", error);
        res.render("login.ejs", { errorMsg: "Error during login." });
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Internal server error");
        }
        res.redirect("/login");
    });
});

module.exports = router;
