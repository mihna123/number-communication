import express from 'express';
import * as PostsService from './services/post.service.mjs'

const app = express();
const port = 3000;

app.use(express.json());

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




