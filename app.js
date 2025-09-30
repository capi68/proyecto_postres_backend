const express = require("express");
const bodyPrser = require("body-parser");
const db = require("./models");
const bodyParser = require("body-parser");
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

//synchronize DB on startup (only development/test)

db.sequelize.sync()
.then(() => console.log("DB synchronized"))
.catch(err => console.error("Error al sincronizar DB", err));

module.exports = app;