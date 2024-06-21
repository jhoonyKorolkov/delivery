import express from 'express'
import session from 'express-session'
import passport from './passport.js'

const configureApp = app => {
    app.use(express.json())
    app.use(
        session({
            secret: 'SECRET',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false },
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())
}

export default configureApp
