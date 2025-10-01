const express = require("express")

const authRouter = express.Router()

const { SignUp, logIn, verifyEmail } = require("../controllers/auth.controller.js")

authRouter.post("/signup", SignUp)

authRouter.post("/login", logIn)

authRouter.get("/verify/:code", verifyEmail)

module.exports = authRouter