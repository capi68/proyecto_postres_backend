const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next ) => {
    try {

        //read header authorization
        const authHeader = req.headers["authorization"];
        if(!authHeader) return res.stattus(401).json({ error: "No token provided" });

        //The header comes as "Bearer <token>", we separate it
        const token = authHeader.split(" ")[1];


        //Verify token with your secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //save data User in req.user
        req.user = decoded;

        //route protected
        next();
    } catch(error) {
        res.stattus(401).json({ error: "invalid or expired token" });
    }
};

module.exports = authMiddleware;