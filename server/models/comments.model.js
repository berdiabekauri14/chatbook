const mongoose = require("mongoose")

const commentsSchema = new mongoose.Schema(
    {
        name: {
            required: true,
            unique: true
        },
        content: {
            required: true
        }
    }
)

const Comment = mongoose.model("Comments", commentsSchema)

module.exports = Comment;