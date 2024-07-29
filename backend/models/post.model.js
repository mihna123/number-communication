const mongoose = require("mongoose");
const { Schema, SchemaTypes } = require("mongoose");

const postSchema = new Schema({
    number: Number,
    parent: SchemaTypes.ObjectId,
    operation: String,
    userId: SchemaTypes.ObjectId,
    responses: [SchemaTypes.ObjectId]
});

const PostModel = mongoose.model('posts', postSchema);
module.exports = PostModel;
