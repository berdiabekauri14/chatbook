const express = require("express")

const postRouter = express.Router()

const Post = require("../models/post.model.js")

postRouter.post("/", async (req, res) => {
    const { title, content } = req.body;

    const newPost = await Post.create(
        {
            title,
            content,
            likeCount: 0
        }
    )

    res.status(201).json(newPost);
})

module.exports = postRouter