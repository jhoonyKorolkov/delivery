import AppError from './AppError.js'

const ensureAuthenticated = async (req, res, next) => {
    if (req.isAuthenticated()) {
        return next
    } else {
        throw new AppError('Unauthorized', 401)
    }
}

const ensureForbidden = async (req, res, next) => {
    const { id } = req.body
    const userId = req.user._id.toString()
    console.log(id, userId)
    if (id === userId) {
        return next
    }

    throw new AppError('Forbidden', 403)
}

export { ensureAuthenticated, ensureForbidden }
