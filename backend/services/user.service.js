const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const createUser = async (user) => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return UserModel.create({ ...user });
}

//tokenBody has _id: ObjectId and username:string
const generateToken = (tokenBody) => {
    // Token lasts 5h
    const tokenExpire = Date.now() + 1000 * 3600 * 5
    return jwt.sign({ user: tokenBody, exp: tokenExpire }, process.env.AUTH_SECRET);
}

const getUserByToken = (token) => {
    const decodedToken = jwt.decode(token);
    const { user } = JSON.parse(decodedToken);

    return user;
}

const getUsernameById = async (userId) => {
    const user = await UserModel.findOne({ _id: userId });
    return user.username;
}

const getUserByUsername = async (username) => {
    const user = await UserModel.findOne({ username });
    return user;
}

module.exports = {
    createUser,
    generateToken,
    getUserByToken,
    getUserByUsername,
    getUsernameById
};


