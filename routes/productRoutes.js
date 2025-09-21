const express = require("express");
const router = express.Router();
const db = require("../models");
const { where } = require("sequelize");

//=============================
//CRUD "/"
//=============================

//POST new product

router.post("/", async (req, res) => {
    try {
        const  { name, description, price, image_desktop, image_tablet, image_mobile } = req.body;
        const product = await db.Product.create({
            name,
            description,
            price,
            image_desktop,
            image_tablet,
            image_mobile
        })
        res.status(201).json(product);
    } catch(err) {
        res.status(400).json({ error: "Error creating product" });
    }
});

// GET all products

router.get("/", async (req, res) => {
    try {
        const products = await db.Product.findAll({ where: { active: true } });
        res.json(products);
    } catch(error) {
        res.status(500).json({ error: "Error getting products" });
    }
});


//====================
//CRUD "/:id"
//====================

//GET product by id

router.get("/:id", async (req, res) => {
    try {
        const product = await db.Product.findByPk(req.params.id);
        if(!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch(error) {
        res.status(500).json({ error: "Error searching product"});
    }
});

//PUT product by Id

router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image_desktop, image_tablet, image_mobile } = req.body;

        const product = await db.Product.findByPk(id);
        if(!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        await product.update({ name,description, price, image_desktop, image_tablet, image_mobile });
        res.json({ message: "Product updated", product });
    } catch(err) {
        res.status(500).json({ error: "Error updating product" });
    }
});

//PATCH product by id

router.patch("/:id", async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const product = await db.Product.findByPk(id);
        if (!product) { return res.status(404).json({ error: "Product not found" });
    }

    const updated = await product.update(req.body);
    console.log("UPDATED", updated.toJSON()); //debug

    res.json({ message: "updated product", product: updated });
    } catch(error) {
        res.status(500).json({ error: "Error updatind product" });
    }
});

// DELETE product by id

router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const product = await db.Product.findByPk(id);
        if(!product) { return res.status(404).json({ error: "Product not found" });
    }

    product.active = false;
    await product.save();

    res.json({ message: "Product inactive by soft delete" });

    } catch(error){
        res.status(500).json({ error: "Error deleting Product" });
    }
});

module.exports = router;