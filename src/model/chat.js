import { Schema, Types, model } from 'mongoose'
import { EventEmitter } from 'events'

const chatEmitter = new EventEmitter()

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

            const chat = await this.findOne({
                users: { $all: [obgSenderId, obgReceiverId] },
            })
            return chat
        } catch (error) {
            console.log('Error finding chat', error)
            return null
        }
    }

    static async createChat(senderId, receiverId) {
        try {
            const chat = await this.create({
                users: [senderId, receiverId],
            })
            return chat
        } catch (error) {
            console.log('Error creating chat', error)
            return null
        }
    }

    static async getHistory(chatId) {
        try {
            const chat = await this.findOne({ _id: chatId }).populate(
                'messages'
            )
            return chat
        } catch (error) {
            console.log('Ошибка при получении истории чата', error)
            return null
        }
    }

    static emitNewMessage(chatId, message) {
        chatEmitter.emit('newMessage', chatId, message)
    }

    static subscribe(callback) {
        chatEmitter.on('newMessage', (chatId, message) => {
            console.log(
                `Новое сообщение в чате ${chatId}: ${message.text} от ${message.author}`
            )
            callback(chatId, message)
        })
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
