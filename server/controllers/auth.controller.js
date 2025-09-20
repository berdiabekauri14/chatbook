const catchAsync = require("../utils/catchAsync.js")
const User = require("../models/user.model.js")
const AppError = require("../utils/appError.js")
const jwt = require("jsonwebtoken")

const signToken = (id, role) => { // გვჭირდება იმისთვის რომ აღარ მოგვეწიოს ხელახლად ტოკენის ხელმოწერა
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES })
}

const createSendToken = (user, statusCode) => { // გვჭირდება იმისთვის რომ შევქმნათ ტოკენი და გავაგზავნოთ, ამ ფუნქციით ასევე cookies შევქმნით
    const token = signToken(user._id, user.role)

    const cookiesOption = {
        maxAge: new Date(
            Date.now + process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV = "development" ? false : true
    }

    res.cookie("jwt", token, cookiesOption)

    newUser.password = undefined

    res.status(statusCode).json({
        user: newUser,
        token
    })
}

const SignUp = catchAsync(async (req, res, next) => { // გვჭირდება იმისთვის რომ გამოვიტანოთ შედეგი და რომ დავრეგისტრირდეთ
    const { fullname, email, password } = req.body;

    const newUser = await User.create({
        fullname,
        email,
        password
    })

    const token = signToken(newUser._id, newUser.role)

    createSendToken(newUser, token)
})

const logIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (User.email !== email || User.password !== password) {
        return new AppError("Email or password is incorrect", 403)
    }

    res.json("You succsefully logged in!")
})

module.exports = { SignUp, logIn }

// ჩვენ cookies(ნამცხვრები) იმისთვის გვჭირდება რომ დავმალოთ ინფორმაცია და ტოკენები რომ არავინ არ შევიდეს ჩვენს შექმნილ user-ში

// ჩვენ გვჭირდება jwt(json web token)-ი იმისთვის რომ გამოვიტანოდ მაგალითად რომ როდის შევიდა მომხმარებელმა საიტზე და კიდე რომ რამდენჯერაც რომ შევა მომხმარებელი ამ ბილიკზე სულ რომ დაიმახსობრებს რა მონაცემებითაც იყო შემოსული მომხმარებელი და პირდაპირ რომ შევიდეს, მაგრამ როცა ტოკენს ვადა გაუვა ახლიდან მოუწევს მომხმარებელს მონაცემების შეყვანა