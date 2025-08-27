const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        likesCount: {
            type: Number,
            default: 0
        }
    }
)

const Post = mongoose.model("Posts", postSchema)

module.exports = Post;