import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import { authorizationGuard } from './middleware/auth.middleware.mjs';
import * as PostsService from './services/post.service.mjs';
import * as UserService from './services/user.service.mjs';

const app = express();
const port = 3000;
const mongoUri = process.env.MONGO_URI;

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};

try {
    await mongoose.connect(mongoUri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
} catch (e) {
    await mongoose.disconnect();
    console.log(e);
}

app.use(cookieParser());
app.use(express.json());

app.post('/auth/signup', async (req, res) => {
    const { username, password, repeatedPassword } = req.body;
    if (password !== repeatedPassword) {
        res.status(400).send('Password not same as repeated password');
    }

    const user = await UserService.createUser({ username, password });
    res.send(user);
});

app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserService.getUserByUsername(username);

    if (!user) {
        throw new Error(`Username ${username} doesn't exist!`);
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        throw new Error(`Incorect password!`);
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

app.get('/posts', async (_, res) => {
    const posts = await PostsService.getAllPosts();
    res.json(posts);
});

app.post('/posts', authorizationGuard, async (req, res) => {
    const newPost = req.body;
    const posts = await PostsService.addPost(newPost);
    res.json(posts);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
