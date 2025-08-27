const User = require("../models/user.model.js")
const AppError = require("../utils/appError.js")
const catchAsync = require("../utils/catchAsync.js")

const getUsers = catchAsync(async (req, res) => {
    const users = await User.find()

    res.status(200).json(users)
})

const getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (user) {
        res.json(user)
    } else {
        return next(new AppError("User not found", 404))
    }
})

const createUser = catchAsync(async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
        return res.status(403).json({
            status: "Something missing",
            message: "fullname, email and password is required"
        })
    }

    const newUser = await User.create({
        fullname,
        email,
        password
    })

    res.status(201).json(newUser)
})

const deleteUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
        return next(new AppError("User not found", 404))
    }

    res.status(204).send()
})

const updateUser = catchAsync(async (req, res, next) => {
    const { id } = req.params

    const { fullname, email, password } = req.body;

    const user = await User.findById(id)

    if (!user) {
        return next(new AppError("User not found", 404))
    }

    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (password) user.password = password

    await user.save()

    res.status(200).json(user)
})

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser }