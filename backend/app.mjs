import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
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

app.use(express.json());
app.use(cookieParser());

app.post('/auth/signup', async (req, res) => {
    const { username, password, repeatedPassword } = req.body;
    if (password !== repeatedPassword) {
        res.status(400).send('Password not same as repeated password');
    }

    const user = await UserService.createUser({ username, password });
    res.send(user);
})

app.get('/posts', async (_, res) => {
    const posts = await PostsService.getAllPosts();
    res.json(posts);
});
app.post('/posts', async (req, res) => {
    const newPost = req.body;
    const posts = await PostsService.addPost(newPost);
    res.json(posts);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});




