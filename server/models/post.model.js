const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            mixLength: [3, "3 letters must be a minimum title"],
            unique: true
        },
        content: {
            type: String,
            required: true
        },
        likesCount: {
            type: Number,
            default: 0
        },
        comments: {
            content: {
                type: String,
                required: [true, "Comments are required"]
            },
            author: {
                type: String,
                required: [true, "Author is required"]
            }
        },
        tags: {
            type: Array,
            required: true
        }
    }
)

const Post = mongoose.model("Posts", postSchema)

module.exports = Post;