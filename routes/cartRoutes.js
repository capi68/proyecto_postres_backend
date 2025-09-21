const express = require("express");
const router = express.Router();
const db = require("../models");
const { where } = require("sequelize");

//=========================
// CRUD "/"
//=========================

// POST >> add product to the cart
router.post("/", async(req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check if it is already in the cart
        let cartItem = await db.CartItem.findOne({
            where: { userId, productId },
        });

        if (cartItem) {
            cartItem.quantity += quantity;  //If it already exists, add one unit
        } else {
            cartItem = await db.CartItem.create({ userId, productId, quantity }); //If no exist, generate Item
        }

        res.status(201).json(cartItem);
    } catch(error) {
        console.error("Error adding to cart", error);
        res.status(500).json({ error: "Error adding product to cart" });
    }
});

//GET "/:userId" >>> get itemcart from User

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const cartItems = await db.CartItem.findAll({
            where: { userId },
            include: [
                {
                    model: db.Product,
                    as: "product",
                },
            ],
        });

        res.json(cartItems);
    } catch(error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Error fetching cart..."});
    }
});

//PUT "/:id" >>> update quantity of a specific cartItem
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await db.CartItem.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ error: "CartItem not found" });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.json(cartItem);
    } catch(error) {
        console.error("error updating cartiItem:", error);
        res.status(500).json({ error: "Error updating cartItem..." });
    }
});

// DELETE "/:id" >>> delete an icartItem from Cart
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await db.CartItem.findByPk(id);

        if(!cartItem) {
            return res.status(404).json({ error: "CartItem not found" });
        }

        await cartItem.destroy();
        res.json({ message: "CartItem removed" });
    } catch(error){
        console.error("Error deleting cartItem:", error);
        res.status(500).json({ error: "Error deleting CartItem..."});
    }
});