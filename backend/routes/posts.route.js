const express = require("express");
const PostsService = require('../services/post.service.js');
const authorizationGuard = require("../middleware/auth.middleware.js");

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

module.exports = postsRoute;
