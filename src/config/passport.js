import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../model/users.js'
import bcrypt from 'bcrypt'

passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email })

                if (!user) {
                    return done(null, false, {
                        message: 'Неверный логин или пароль.',
                        status: 'error',
                    })
                }

                const isPasswordMatch = await bcrypt.compare(
                    password,
                    user.passwordHash
                )

                if (!isPasswordMatch) {
                    return done(null, false, {
                        message: 'Неверный логин или пароль.',
                        status: 'error',
                    })
                }

                return done(null, user)
            } catch (err) {
                return done(err)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
})

export default passport
