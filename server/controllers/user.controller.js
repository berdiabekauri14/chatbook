const User = require("../models/user.model.js")

const getUsers = async (req, res) => {
    const users = await User.find()

    res.status(200).json(users)
}

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        res.json(user)
    } else {
        return res.status(404).json({
            status: "fail",
            message: "404 not found"
        })
    }
}

const createUser = async (req, res) => {
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
}

const deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
        return res.status(404).json({
            status: "fail",
            message: "404 not found"
        })
    }

    res.status(204).send()
}

const updateUser = async (req, res) => {
    const { id } = req.params

    const { fullname, email, password } = req.body;

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({
            status: "fail",
            message: "404 not found"
        })
    }

    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (password) user.password = password

    await user.save()

    res.status(200).json(user)
}

module.exports = { getUsers, getUser, createUser, deleteUser, updateUser }