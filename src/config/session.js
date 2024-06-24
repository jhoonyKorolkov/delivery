import session from 'express-session'

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false, // куки были доступны на клиентской стороне
    },
}

const middlewareSession = session(sessionConfig)

export default middlewareSession
