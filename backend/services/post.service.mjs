import fs from 'fs/promises';

const getAllPosts = async () => {
    const data = await fs.readFile('data/posts.json', 'utf8');
    return JSON.parse(data);
};

const addPost = async (post) => {
    // Get all posts data
    const data = await fs.readFile('data/posts.json', 'utf8');
    const posts = JSON.parse(data);

    // Make sure new id is unique;
    post.id = posts.length + 1;
    posts.forEach(p => {
        if (p.id === post.id) {
            post.id++;
        };
    });

    // Append new post and return all
    posts.push(post);
    await fs.writeFile('data/posts.json', JSON.stringify(data));
    return posts;
}

export {
    getAllPosts,
    addPost
};
