const jwt = require("jsonwebtoken");
const db = require("../models");

const authMiddleware = async (req, res, next ) => {
    try {

        //read header authorization
        const authHeader = req.headers["authorization"];
        if(!authHeader) return res.status(401).json({ error: "No token provided" });

        //The header comes as "Bearer <token>", we separate it
        const token = authHeader.split(" ")[1];


        //Verify token with your secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //debug log
        console.log("Auth middleware ejecutado, usuario:", decoded);  

        const user = await db.User.findByPk(decoded.id, {
            attributes: ["id", "name", "email" ],
        });
        if (!user) return res.status(404).json({ error: "user not found"}); 

        //save data User in req.user
        req.user = user;

        //route protected
        next();
    } catch(error) {
        res.status(401).json({ error: "invalid or expired token" });
    }
};

module.exports = authMiddleware;