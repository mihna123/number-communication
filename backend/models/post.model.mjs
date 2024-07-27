import mongoose, { Schema, SchemaTypes } from "mongoose";

const postSchema = new Schema({
    number: Number,
    parent: SchemaTypes.ObjectId,
    operation: String,
    userId: SchemaTypes.ObjectId,
    responses: [SchemaTypes.ObjectId]
});

export const PostModel = mongoose.model('posts', postSchema);
