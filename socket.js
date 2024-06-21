import { Server } from 'socket.io'
import { handleChatMessage } from './src/controller/chat.js'
import session from 'express-session'

const startSocketIo = server => {
    const io = new Server(server, {
        connectionStateRecovery: {},
    })

    io.on('connection', socket => {
        const currentUserId = socket.request.session.passport.user._id
        console.log(currentUserId)

        log
        // socket.on('comment message', (msg) => {
        //   socket.broadcast.emit('comment message', msg);
        //   socket.emit('comment message', msg);
        // });
        socket.on('message', async msg => {
            const senderId = socket.id // Используем socket.id гостя как senderId
            const receiverId = msg.receiver // author_user_id
            const text = msg.text

            await handleChatMessage(senderId, receiverId, text)

            // Отправка сообщения получателю
            io.to(receiverId).emit('newMessage', {
                senderId,
                content,
            })
        })
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}

export default startSocketIo
