const express = require("express")

const authRouter = express.Router()

const { SignUp, logIn, verifyEmail, autoLogin } = require("../controllers/auth.controller.js")

const { protect } = require("../middlewares/auth.middleware.js")

authRouter.post("/signup", SignUp)

authRouter.post("/login", logIn)

authRouter.get("/verify/:code", verifyEmail)

authRouter.get("/login", autoLogin)

module.exports = authRouter