import fs from 'fs/promises';

const getAllPosts = async () => {
    const data = await fs.readFile('data/posts.json', 'utf8');
    return JSON.parse(data);
};

const addPost = async (post) => {
    const data = await fs.readFile('data/posts.json', 'utf8');
    const posts = JSON.parse(data);
    posts.append(post);
    await fs.writeFile('data/posts.json', JSON.stringify(data));
    return posts;
}

export {
    getAllPosts,
    addPost
};
