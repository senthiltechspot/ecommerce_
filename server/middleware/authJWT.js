const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyToken = (req, res, next) => {

    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({ message: "JWT Token is missing" });
    }
    jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        };
        const userId = decoded.userId;
        const user = await User.findByPk(userId);
        req.user = user;
        next();
    });
}

const adminOnly = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    try {
        if (!token) {
            return res.status(403).json({ message: "JWT Token is missing" });
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized!" });
            }
            const user = await User.findByPk(decoded.userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            if (user.userType !== 'admin') {
                return res.status(403).json({ error: 'You are Not Authorized to Perform This Operation' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const authJWT = {
    verifyToken: verifyToken,
    adminOnly: adminOnly
}

module.exports = authJWT;