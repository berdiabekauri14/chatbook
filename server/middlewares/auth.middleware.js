const User = require("../models/user.model");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken")

const allowedTo = (...roles) => { // allowedTo ფუნქციის მეშვეობით, ჩვენ შევამოწმებთ რომ თუ მაგალითად მომხმარებელის წოდება არის user მაშინ ვუთხრათ რომ არ აქვს უფლება რომ დაამატოს პოსტი და admin წოდებაზე კი შეიძლება
    return (req, res, next) => { // აქ კი უკვე შევამოწმებთ რომ რა წოდება აქვს მომხმარებელს
        if (!roles.includes(req.user.roles)) {
            return next(new AppError("you dont have permission to this!", 401)) // აქ ვაბრუნებთ ერორს რომ არ აქვთ უფლება პოსტების დამატებაზე თუ admin წოდება არ აქვს
        }

        next(); // ბოლოს კი protect ფუნქციაზე გადავალთ
    }
}

// ჩვენ წოდების კონტროლი იმიტომ გვჭირდება რომ სხვები რომელსაც არ იმსახურებენ მთავარ წოდებას არ გამოიწვიონ რამე თანაც ყველანაირი წოდება რომ აქვს ყველა მომხმარებელს. როცა კი წოდებებს ვაკონტროლებთ არ იქნება ქაოსი და  თანაც გაიგებენ ადამიანები რომ ვინ არის ადმინი და ა.შ

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.lt;

        if (!token) {
            return next(new AppError("user is not logged in!", 401))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return next(new AppError("token is invalid", 400))
        }

        console.log(decoded)

        const user = await User.findById(decoded.id)

        if (!user) {
            return next(new AppError("user cam't be found!", 404))
        }

        console.log(user)

        req.user = user;
        
        next()

    } catch(err) {
        if (err.name === "TokenExpiredError") {
            return next(new AppError("you are not authorized", 401))
        }
    }
}

module.exports = { protect, allowedTo }