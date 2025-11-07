// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// =====================================================
//  CORS 
// =====================================================
const allowlist = [
  "http://localhost:5173",
  "https://wikipostres-project.netlify.app/", // 
];

const corsOptions = {
  origin(origin, callback) {
    // Permitir si no hay origen (Postman, SSR) o si está en la lista
    if (!origin || allowlist.includes(origin)) {
      return callback(null, true);
    }
    console.warn("CORS bloqueado para origen:", origin);
    return callback(new Error("CORS not allowed"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  optionsSuccessStatus: 204,
};

// Aplica CORS global
app.use(cors(corsOptions));
// Responde preflight OPTIONS global
app.options("*", cors(corsOptions));

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

module.exports = app;
