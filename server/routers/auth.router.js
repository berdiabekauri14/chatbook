const express = require("express")

const authRouter = express.Router()

const { SignUp, logIn } = require("../controllers/auth.controller.js")

authRouter.use("/auth", SignUp)

authRouter.use("/auth/login", logIn)