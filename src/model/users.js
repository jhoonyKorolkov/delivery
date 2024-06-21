import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    contactPhone: {
        type: String,
    },
})

class UserClass {
    static async create(data) {
        const user = new this(data)
        await user.save()
        return user
    }

    static async findByEmail(email) {
        return await this.findOne({ email })
    }
}

UserSchema.methods.toJSON = function () {
    const obj = this.toObject()
    obj.id = obj._id
    delete obj.__v
    delete obj._id
    delete obj.passwordHash
    return obj
}

UserSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.passwordHash)
}

UserSchema.loadClass(UserClass)

const User = model('User', UserSchema)

export default User
