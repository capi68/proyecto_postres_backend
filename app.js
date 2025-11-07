// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// =====================================================
// CORS 
// =====================================================
const allowedOrigins = [
  "http://localhost:5173",
  "https://wikipostres-project.netlify.app/", 
];

// Middleware CORS
app.use(
  cors({
    origin: function (origin, callback) {
      
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn("🚫 Bloqueado por CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, 
  })
);

// Respuesta global a preflight
app.options("*", cors());

// =====================================================
app.use(bodyParser.json());

// =====================================================
// Routes
// =====================================================
app.use("/products", require("./routes/productRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/orders", require("./routes/orderRoutes"));

module.exports = app;
