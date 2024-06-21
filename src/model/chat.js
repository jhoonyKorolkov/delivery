import { Schema, Types, model } from 'mongoose'

const ChatSchema = new Schema({
    users: {
        type: [Types.ObjectId],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    messages: [
        {
            type: Types.ObjectId,
            ref: 'Message',
        },
    ],
})

class ChatClass {
    static async findChat(senderId, receiverId) {
        try {
            const obgSenderId = new Types.ObjectId(senderId)
            const obgReceiverId = new Types.ObjectId(receiverId)

            console.log(obgSenderId, obgReceiverId)

            const chat = await this.findOne({
                users: { $all: [obgSenderId, obgReceiverId] },
            })
            return chat
        } catch (error) {
            console.log('Error finding chat', error)
            return null
        }
    }

    static async createChat(senderId, receiverId, message) {
        try {
            const chat = await this.create({
                users: [senderId, receiverId],
                messages: [message._id],
            })
            return chat
        } catch (error) {
            console.log('Error creating chat', error)
            return null
        }
    }
}

ChatSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.__v
    return obj
}

ChatSchema.loadClass(ChatClass)

const Chat = model('Chat', ChatSchema)

export default Chat
