import express from 'express'
import passport from './passport.js'
import middlewareSession from './session.js'

const configureApp = app => {
    app.use(express.json())
    app.use(middlewareSession)
    app.use(passport.initialize())
    app.use(passport.session())
}

export default configureApp
