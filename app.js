const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");

const app = express();

//////////////////////////////////////////////////////////////////////////////
//ENHABLE CORS
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.json());

//////////////////////////////////////////////////////////////////////////////

//Routes
app.use("/products", require("./routes/productRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/cart", require("./routes/cartRoutes"));
app.use("/orders", require("./routes/orderRoutes"));



module.exports = app;