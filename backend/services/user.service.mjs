import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.mjs";
import * as jwt from "jsonwebtoken";

const createUser = async (user) => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    return UserModel.create({ ...user });
}

//tokenBody has id: number and username:string
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

const getUserByUsername = async (username) => {
    const user = await UserModel.findOne({ username });
    if (!user) {
        throw new Error(`There is no user with username: ${username}`);
    }
    return user;
}

export {
    createUser,
    generateToken,
    getUserByToken,
    getUserByUsername
};


