const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authorization: Bearer <token>
function authenticate(req, res, next) {
    const token = req.headers['x-access-token'];
    
    if (!token) {
        return res.status(403).send({message: "authorization denied", isAuthenticated: false});
    }

    console.log(token);
    token = token.split(" ")[1];

    try {
        const verify = jwt.verify(token, process.env.jwtSecret);

        req.user = verify.user;
        next();
    } catch (err) {
        res.status(401).send({message: "Token is not valid", isAuthenticated: false});
    }
}

module.exports = authenticate;
