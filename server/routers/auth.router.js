const express = require("express")

const authRouter = express.Router()

const { SignUp } = require("../controllers/auth.controller.js")

authRouter.use("/auth", SignUp)