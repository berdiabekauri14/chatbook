const express = require("express")

const authRouter = express.Router()

const { SignUp, logIn, verifyEmail, autoLogin, logout } = require("../controllers/auth.controller.js")

const { protect } = require("../middlewares/auth.middleware.js")

authRouter.post("/signup", SignUp)

authRouter.post("/login", logIn)

authRouter.get("/verify/:code", verifyEmail)

authRouter.get("/auto-login", protect, autoLogin)

authRouter.post("/logout", protect, logout)

module.exports = authRouter