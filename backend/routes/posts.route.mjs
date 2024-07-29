import express from "express";
import * as PostsService from '../services/post.service.mjs';
import { authorizationGuard } from "../middleware/auth.middleware.mjs";

const postsRoute = express.Router();

postsRoute.get('/', async (_, res) => {
    const posts = await PostsService.getAllPosts();
    res.json(posts);
});

postsRoute.post('/', authorizationGuard, async (req, res) => {
    const newPost = req.body;
    const allPosts = await PostsService.addPost(newPost.post);
    res.status(200).json(allPosts);
});

postsRoute.post('/reply', authorizationGuard, async (req, res) => {
    const replyData = req.body;
    const allPosts = await PostsService.replyToPost(replyData);
    res.status(200).json(allPosts);
});

export default postsRoute;
