const express = require("express")

const postRouter = express.Router()

const { getPosts, getPost, createPost, deletePost, updatePost } = require("../controllers/post.controller.js")

postRouter
    .route("/")
    .get(getPosts)
    .post(createPost)

postRouter
    .route("/:id")
    .get(getPost)
    .delete(deletePost)
    .patch(updatePost)

module.exports = postRouter