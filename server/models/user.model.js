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
    role: {
        default: "User"
    },
    password: {
        type: String,
        required: true,
        unique: true,
        mixLength: [8, ["Password must require 8 or more letters"]]
    }
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next(); 
});

userSchema.methods.comparePassword = async (candidate, password) => {
    return await bcrypt.compare(candidate, password);
};

const User = mongoose.model("Users", userSchema)

module.exports = User