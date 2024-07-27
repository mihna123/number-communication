import jwt from 'jsonwebtoken';
import * as UserService from '../services/user.service.mjs';

export const authorizationGuard = async (req, res, next) => {
    const { token } = req.cookies;
    if (!(token && req.cookies)) {
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
