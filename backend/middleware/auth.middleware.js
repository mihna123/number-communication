const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service.js');

const authorizationGuard = async (req, res, next) => {
    const { token } = req.body;
    if (!token) {
        res.status(401).json({ error: "You are not logged in!" });
        return;
    }

    const decodedToken = jwt.decode(token);
    const { user } = decodedToken;

    const reqUser = await UserService.getUserByUsername(user.username);
    if (!reqUser) {
        res.status(401).json({ error: "You are not logged in!" });
        return;
    }

    next();
}

module.exports = authorizationGuard;
