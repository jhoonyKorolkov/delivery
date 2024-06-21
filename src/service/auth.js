import User from '../model/users.js'
import AppError from '../middleware/AppError.js'
import bcrypt from 'bcrypt'

const createUserService = async user => {
    try {
        const { email, password, name, contactPhone } = user

        const findUser = await User.findByEmail(email)

        const passwordHash = bcrypt.hashSync(password, 10)

        if (findUser) {
            throw new AppError('User already exists', 409)
        }

        const newUser = await User.create({
            email,
            passwordHash,
            name,
            contactPhone,
        })
        return newUser
    } catch (error) {
        throw error
    }
}

export { createUserService }
