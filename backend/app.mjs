import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { ExpressAuth } from '@auth/express';
import Google from "@auth/express/providers/google";
import * as PostsService from './services/post.service.mjs'

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
app.use('/auth/*', ExpressAuth({ providers: [Google] }))

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




