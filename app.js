// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// =====================================================
//  CORS ABIERTO TEMPORAL (para evitar bloqueos y caídas)
// =====================================================
app.use(cors());
app.options("*", cors());

// =====================================================
// Middlewares
// =====================================================
app.use(bodyParser.json());

// =====================================================
// Routes
// =====================================================
app.use("/products", require("./routes/productRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

// =====================================================
// Export app
// =====================================================
module.exports = app;
