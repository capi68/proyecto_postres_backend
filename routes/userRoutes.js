const express = require("express");
const router = express.Router();
const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 


//======================
// Register User
//======================

router.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body;

        // verify if User is already exist
        const existingUser = await db.User.findOne({ where: { email } });
        if(existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create User
        const newUser = await db.User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User created" , user: { id: newUser.id, name: newUser.name, email: newUser.email } });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Error registering User" });
    }
});

//POST /users/login
router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.User.findOne({ where: { email } });
        if(!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid Password" });

        //token generate
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;