import { entity } from "simpler-state";

export const posts = entity([]);

export const getRepliesToPost = (id) => {
    const thePost = posts.get().find(p => p._id == id);
    const responses = thePost.responses.map(respId => {
        return posts.get().find(p => p._id == respId);
    });
    return responses.filter(r => !!r);
}
