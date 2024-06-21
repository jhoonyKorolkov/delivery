import AppError from '../middleware/AppError.js'
import { createUserService } from '../service/auth.js'
import passport from 'passport'

const userSignIn = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }

        if (!user) {
            return next(new AppError(info.message, 401))
        }

        req.logIn(user, err => {
            if (err) {
                return next(err)
            }
            return res.status(200).json({ user, status: 'ok' })
        })
    })(req, res, next)
}

const createUser = async (req, res, next) => {
    try {
        const newUser = await createUserService(req.body)
        res.status(201).json({ newUser, status: 'ok' })
    } catch (error) {
        next(error)
    }
}

const userLogOut = (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err)
        }
        res.status(200).json({ status: 'ok' })
    })
}

export { userSignIn, createUser, userLogOut }
