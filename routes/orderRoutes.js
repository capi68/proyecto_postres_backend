const express = require("express");
const router = express.Router();
const db = require("../models");
const authMiddleware = require("../middleware/auth");



//POST orders/checkout
router.post("/checkout", authMiddleware, async(req, res) => {
    try {
        const userId = req.user.id;

        //get cartItem User
        const cartItems = await db.CartItem.findAll({
            where: { userId },
            include: [{model: db.Product, as: "product" }],
        });

        if(!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is Empty" });
        }

        //Calculate total
        const totalPrice = cartItems.reduce((acc, item) => {
            return acc + item.quantity * parseFloat(item.product.price);
        }, 0);

        //Create Order
        const order = await db.Order.create({
            userId,
            totalPrice,
            status: "Pending",
        });

        //Create OrderItems
        const orderItemsData = cartItems.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
        }));

        await db.OrderItem.bulkCreate(orderItemsData);

        //Empty Cart
        await db.CartItem.destroy({where: { userId} });

        res.status(201).json({
            message: "order create succesfully",
            order,
            orderItems: orderItemsData,
        });
    } catch(error) {
        console.error("Checkout error:", error);
        res.status(500).json({ error: "Error during checkout..."});
    }
});

module.exports = router;