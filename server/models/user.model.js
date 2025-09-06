const mongoose = require("mongoose")

const userSchema = {
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        mixLength: [8, ["Password must require 8 or more letters"]]
    }
}

const User = mongoose.model("Users", userSchema)

module.exports = User