const dotenv = require("dotenv")

dotenv.config()

const sendErrorDev = (err, req, res) => {
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message || "Something went wrong",
        stack: err.stack,
        error: err
    })
}

const sendErrorProd = (err, req, res) => {
    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message || "Something went wrong"
    })
}

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    res.status(err.statusCode).json(err)

    if (process.env.NODE_ENV === "development") {
        return sendErrorDev()
    } else {
        return sendErrorProd()
    }
}

module.exports = globalErrorHandler