const express = require("express")

const authRouter = express.Router()

const { SignUp, logIn } = require("../controllers/auth.controller.js")

authRouter.post("/signup", SignUp)

authRouter.post("/login", logIn)

module.exports = authRouter