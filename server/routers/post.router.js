const express = require("express")

const postRouter = express.Router()

const { getPosts, getPost, createPost, deletePost, updatePost } = require("../controllers/post.controller.js")
const { protect, allowedTo } = require("../middlewares/auth.middleware.js")

postRouter
    .route("/")
    .get(getPosts)
    .post(protect, allowedTo("admin"), createPost) // აქ გამოვიძახებთ უკვე allowedTo ფუნქციას და არგუმენტად გადავეცით admin რადგან რომ მარტო მაგ წოდებაზე ქონდეს მომხმარებელს უფლება პოსტების დამატებაზე

postRouter
    .route("/:id")
    .get(getPost)
    .delete(protect, allowedTo("admin", "moderator"), deletePost)
    .patch(protect, allowedTo("admin", "moderator"), updatePost)

module.exports = postRouter