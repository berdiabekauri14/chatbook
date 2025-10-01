const mongoose = require("mongoose")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Fullname is required'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique']
    },

    photo: String,

    role: {
        enum: ['user', 'admin', 'moderator'],
        default: 'user',
        type: String
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters'],
        select: false
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    verificationCode: String

}, { timestamps: true });

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    next(); 
});

userSchema.methods.comparePassword = async (candidate, password) => {
    return await bcrypt.compare(candidate, password);
};

userSchema.methods.createVerificationCode = function() {
    const code = Math.floor(1000 + Math.random * 9000).toString();
    this.verificationCode = code;
    console.log(crypto.randomBytes(12).toString("hex"));
    return code;
}

const User = mongoose.model("Users", userSchema)

module.exports = User