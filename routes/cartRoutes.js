const express = require("express");
const router = express.Router();
const db = require("../models");
const { where } = require("sequelize");
const authMiddleware = require("../middleware/auth");

//=========================
// CRUD "/"
//=========================

// POST >> add product to the cart
router.post("/", authMiddleware,  async(req, res) => {
    try {
        const userId = req.user.id //TOKEN
        const { productId, quantity } = req.body;

        // Check if it is already in the cart
        let cartItem = await db.CartItem.findOne({
            where: { userId, productId },
        });

        if (cartItem) {
            cartItem.quantity += quantity;  //If it already exists, add one unit
            await cartItem.save();
        } else {
            cartItem = await db.CartItem.create({ userId, productId, quantity }); //If no exist, generate Item
        }

        res.status(201).json(cartItem);
    } catch(error) {
        console.error("Error adding to cart", error);
        res.status(500).json({ error: "Error adding product to cart" });
    }
});


//GET "/" empty cart
router.get("/", async(req, res) => {
    res.json({ message: "empty cart..." });
})

//GET "/:userId" >>> get itemcart from User

router.get("/:userId", authMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;

        //Mayor security
        if (parseInt(userId) !== req.user.id) {
            return res.status(403).json({ error: "Access denied"});
        }

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
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await db.CartItem.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ error: "CartItem not found" });
        }

        //Mayor security
        if (cartItem.userId !== req.user.id) {
            return res.status(403).json({ error: "Access denied" });
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
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await db.CartItem.findByPk(id);

        if(!cartItem) {
            return res.status(404).json({ error: "CartItem not found" });
        }

        //Mayor security
        if(cartItem.userId !== req.user.id) {
            return res.status(403).json({ error: "Access denied" });
        }

        await cartItem.destroy();
        res.json({ message: "CartItem removed" });

        } catch(error){
            console.error("Error deleting cartItem:", error);
            res.status(500).json({ error: "Error deleting CartItem..."});
            }
});


module.exports = router;