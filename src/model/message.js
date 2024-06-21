import { Schema, Types, model } from 'mongoose'

const MessageSchema = new Schema({
    author: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sentAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    readAt: {
        type: Date,
        default: null,
    },
})

class MessageClass {
    static async sendMessage(senderId, text) {
        const message = await this.create({
            author: senderId,
            text,
        })

        return message
    }
}

MessageSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.__v
    return obj
}

MessageSchema.loadClass(MessageClass)

const Message = model('Message', MessageSchema)

export default Message
