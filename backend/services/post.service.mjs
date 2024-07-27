import { PostModel } from '../models/post.model.mjs';

const getAllPosts = async () => {
    const allPosts = await PostModel.find({});
    return allPosts;
};

const addPost = async (post) => {
    return PostModel.create({ ...post });
}

export {
    getAllPosts,
    addPost
};
