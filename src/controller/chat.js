import Message from '../model/message.js'
import Chat from '../model/chat.js'

const handleChatMessage = async msg => {
    let chat = await Chat.findChat(msg.senderId, msg.receiverId)
    console.log(chat)

    return
    const newMessage = await Message.sendMessage(senderId, text)

    if (!chat) {
        chat = await Chat.createChat(senderId, receiverId, newMessage)
    } else {
        chat.messages.push(newMessage._id)
        await chat.save()
    }

    return newMessage
}

export { handleChatMessage }
