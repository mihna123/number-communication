const express = require("express");
const bcrypt = require('bcrypt');
const UserService = require('../services/user.service.js');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
    const { username, password, repeatedPassword } = req.body;
    if (password !== repeatedPassword) {
        res.status(400).send('Password not same as repeated password');
    }

    const user = await UserService.createUser({ username, password });
    res.send(user);
});

authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserService.getUserByUsername(username);
    if (!user) {
        return res.status(404).json({
            error: `User with username ${username} doesn't exist!`
        });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(404).json({
            error: `Incorect password!`
        });
    }

    const tokenBody = { _id: user._id, username: user.username };
    const token = UserService.generateToken(tokenBody);
    const options = {
        maxAge: 1000 * 3600 * 5,
        httpOnly: true,
    }

    return res
        .status(200)
        .cookie('token', token, options)
        .json({
            token,
            message: "Login Successful!"
        });
});

module.exports = authRouter;
