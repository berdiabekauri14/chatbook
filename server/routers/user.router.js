const express = require("express")

const userRouter = express.Router()

const { getUsers, getUser, createUser, deleteUser, updateUser } = require("../controllers/user.controller.js")

userRouter
    .route("/")
    .get(getUsers)
    .post(createUser)

userRouter
    .route("/:id")
    .get(getUser)
    .delete(deleteUser)
    .patch(updateUser)

module.exports = userRouter