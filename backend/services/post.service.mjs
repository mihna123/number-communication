import { PostModel } from '../models/post.model.mjs';

const getAllPosts = async () => {
    const allPosts = await PostModel.find({});
    return allPosts;
};

const addPost = async (post) => {
    await PostModel.create({ ...post });
    return getAllPosts();
};

const replyToPost = async (replyData) => {
    const postToReplyTo = await PostModel.findOne({ _id: replyData.reply.parent });
    if (!postToReplyTo) {
        console.log("Coulndn't find post to reply to!");
        return;
    }
    const newPost = await PostModel.create({ ...replyData.reply });
    console.log(newPost);
    postToReplyTo.responses = [...postToReplyTo.responses, newPost._id];
    await postToReplyTo.save();
    return getAllPosts();
};

export {
    getAllPosts,
    addPost,
    replyToPost,
};
