class AppError extends Error {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.operation = true

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = AppError;