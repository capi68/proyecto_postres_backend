const express = require("express");
const router = express.Router();
const db = require("../models");
const authMiddleware = require("../middleware/auth");



//POST orders/checkout
router.post("/checkout", authMiddleware, async(req, res) => {
    try {
        const userId = req.user.id;
        const { address, paymentMethod, items, phone, deliveryMethod } = req.body;

        if(!items || items.length === 0) {
            return res.status(400).json({ error: "Cart is Empty or not sent" });
        }

        //Calculate total
        const totalPrice = items.reduce((acc, item) => 
             acc + item.quantity * parseFloat(item.price), 0);

        //Create Order
        const order = await db.Order.create({
            userId,
            totalPrice,
            status: "Pending",
            address,             //from frontend
            paymentMethod,       //from frontend
            phone,               //from frontend
            deliveryMethod,      //from frontend
        });

        //Create OrderItems
        const orderItemsData = items.map((item) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
        }));

        await db.OrderItem.bulkCreate(orderItemsData);

        res.status(201).json({
            message: "order create succesfully",
            order,
            orderItems: orderItemsData,
        });
    } catch(error) {
        console.error("Checkout error details:", error);
        res.status(500).json({ error: "Error during checkout...", details: error.message});
    }
});

module.exports = router;