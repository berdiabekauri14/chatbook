const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const mongoose = require("mongoose")
const postRouter = require('./router/post.router.js')

const app = express()

dotenv.config();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

app.use("/api/posts", postRouter)

mongoose.connect(process.env.URL)
    .then(() => {
        console.log('MongoDB is succsesfully running')
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    })
    .catch(() => console.log("Error has been found in your code"))

