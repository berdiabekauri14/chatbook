const catchAsync = require("../utils/catchAsync.js")
const AppError = require("../utils/appError.js")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model.js")
const sendEmail = require("../utils/email.js")

const signToken = (id, role) => { 
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES })
}

const createSendToken = (user, statusCode) => {
    const token = signToken(user._id, user.role)

    const cookiesOption = {
        maxAge: process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV = "development" ? false : true,
        httpOnly: true,
        sameSite: "Lax"
    }

    res.cookie("token", token, cookiesOption)

    newUser.password = undefined

    res.status(statusCode).json({
        user: newUser,
        token
    })
}

const SignUp = catchAsync(async (req, res, next) => {
    const { fullname, email, password } = req.body;

    const newUser = await User.create({
        fullname,
        email,
        password
    })

    const token = signToken(newUser._id, newUser.role)

    createSendToken(newUser, token)

    const code = newUser.verificationCode();
    await newUser.save({ validateBeforeSave: false });

    const url = `${req.protocol}://${req.get("host")}/api/v1/auth/verify/${code}`;

    sendEmail({email, url}, "Welcome to chatbook", `Your code is ${code}`)

    res.status(201).json({
        newUser,
        token
    })
})

const logIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (User.email !== email || User.password !== password) {
        return new AppError("Email or password is incorrect", 403)
    }

    res.json("You succsefully logged in!")
})

const autoLogin = (req, res, next) => {
    const user = req.user;

    if (user) {
        return res.status(200).json(user)
    }
}

const logout = (req, res, next) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true 
    })
}

const verifyEmail = catchAsync(async (req, res, next) => {
    const { code } = req.params;

    const user = await User.findOne({ verificationCode: code });

    if(!user) {
        return next(new AppError("Verification code is invalid!", 400))
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    
    await user.save({ validateBeforeSave: false });

    res.status(200).send('<body style="display: flex; justify-content: center; align-items: center; height: 100vh"><h1>User is verified</h1></body>')
})

module.exports = { SignUp, logIn, verifyEmail, autoLogin, logout }