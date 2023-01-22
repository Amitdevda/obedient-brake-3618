const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const decoded = jwt.verify(token, "masai")
        if (decoded) {
            req.body.userID = decoded.userID
            next()
        } else {
            res.send("Please Log-in First")
        }
    } else {
        res.send("Please Log-in First")
    }
}

module.exports = { authenticate }