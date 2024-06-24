import Message from '../model/message.js'
import Chat from '../model/chat.js'

const findChatByUsers = async users => {
    const { senderId, receiverId } = users
    const chat = await Chat.findChat(senderId, receiverId).select('__v')

    return chat
}

const sendMessage = async msg => {
    const { senderId, receiverId, text } = msg

    let chat = await findChatByUsers({ senderId, receiverId })
    if (!chat) {
        chat = await Chat.createChat(senderId, receiverId)
    }

    const newMessage = await Message.sendMessage(senderId, text)

    chat.messages.push(newMessage._id)
    await chat.save()

    Chat.emitNewMessage(chat._id, newMessage)

    return newMessage
}

const getHistoryMessages = async users => {
    const findingChat = await findChatByUsers(users)
    if (!findingChat) return null

    const messages = await Message.find({
        _id: { $in: findingChat.messages },
    }).sort({ sentAt: 1 })
    return messages
}

const markMessagesAsRead = async messageIds => {
    const updatePromises = messageIds.map(messageId =>
        Message.markAsRead(messageId)
    )
    const updatedMessages = await Promise.all(updatePromises)
    return updatedMessages
}

export { sendMessage, findChatByUsers, getHistoryMessages, markMessagesAsRead }
