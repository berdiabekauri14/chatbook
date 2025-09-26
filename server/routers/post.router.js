const express = require("express")

const postRouter = express.Router()

const { getPosts, getPost, createPost, deletePost, updatePost } = require("../controllers/post.controller.js")
const { protect, allowedTo } = require("../middlewares/auth.middleware.js")

postRouter
    .route("/")
    .get(getPosts)
    .post(protect, allowedTo, createPost)

postRouter
    .route("/:id")
    .get(getPost)
    .delete(deletePost)
    .patch(updatePost)

module.exports = postRouter