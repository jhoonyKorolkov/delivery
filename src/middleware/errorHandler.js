import AppError from './AppError.js'

const notFoundHandler = (req, res, next) => {
    const err = new AppError('Page Not Found', 404)
    next(err)
}

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    console.error(`ERROR 💥: ${message}`, { stack: err.stack })

    res.status(statusCode).json({
        status: 'error',
        message: message,
    })
}

export { notFoundHandler, errorHandler }
