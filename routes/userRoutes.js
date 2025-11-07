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
        const email = req.body.email.toLowerCase().trim();
        const name = req.body.name.toLowerCase().trim();
        const password = req.body.password;

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
        const email = req.body.email.toLowerCase().trim();
        const password = req.body.password;

        const user = await db.User.findOne({ where: { email } });
        if(!user) return res.status(404).json({ message: "Usuario no registrado" });

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "clave invalida" });
        

        //token generate
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user });
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;