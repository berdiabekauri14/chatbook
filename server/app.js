const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const mongoose = require("mongoose")
const postRouter = require("./routers/post.router.js")
const userRouter = require("./routers/user.router.js")
const globalErrorHandler = require("./controllers/error.controller.js")
const authRouter = require("./routers/auth.router.js")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const mongoSanitize = require("mongo-sanitizer")
const path = require("path")
const xss = require("xss")
const rateLimit = require("express-rate-limit")

const app = express()

dotenv.config();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(cookieParser())

app.use(helmet())

app.use(mongoSanitize())

app.use(xss())

app.use(rateLimit({
    windowsMs: 60 * 60 * 1000,
    max: 100,
    message: "too many request from this IP, please try again after an hour"
}))

app.use(express.json())

app.use("/api/posts", postRouter)

app.use("/api/users", userRouter)

app.use("/api/auth", authRouter)

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(globalErrorHandler)

mongoose.connect(process.env.URL)
    .then(() => {
        console.log("MongoDB is succsesfully running")
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch(err => console.log(`Error was found in your code: ${err}`))

