import { Server } from 'socket.io'
import {
    sendMessage,
    markMessagesAsRead,
    getHistoryMessages,
} from './src/controller/chat.js'
import middlewareSession from './src/config/session.js'
import passport from 'passport'
import Chat from './src/model/chat.js'

const startSocketIo = server => {
    const io = new Server(server, {
        connectionStateRecovery: {},
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
        cookie: true,
    })

    function onlyForHandshake(middleware) {
        return (req, res, next) => {
            const isHandshake = req._query.sid === undefined
            if (isHandshake) {
                middleware(req, res, next)
            } else {
                next()
            }
        }
    }

    io.engine.use(onlyForHandshake(middlewareSession))
    io.engine.use(onlyForHandshake(passport.session()))
    io.engine.use(
        onlyForHandshake((req, res, next) => {
            if (req.user) {
                next()
            } else {
                res.writeHead(401)
                res.end()
            }
        })
    )

    const handleNewMessage = (chatId, message) => {
        io.emit('newMessage', { chatId, message })
    }

    Chat.subscribe(handleNewMessage)

    io.on('connection', async socket => {
        const currentUserId = socket.request.session.passport.user

        socket.on('getHistory', async msg => {
            const users = {
                senderId: currentUserId,
                receiverId: msg.receiver,
            }
            const history = await getHistoryMessages(users)

            if (history) {
                socket.emit('chatHistory', history)
            } else {
                socket.emit('chatHistory', [])
            }
        })

        socket.on('sendMessage', async msg => {
            const message = {
                senderId: currentUserId,
                text: msg.text,
                receiverId: msg.receiver,
            }
            const newMessage = await sendMessage(message)
        })

        socket.on('markAsRead', async msg => {
            const { messageIds } = msg
            const updatedMessages = await markMessagesAsRead(messageIds)
            console.log('Сообщения отмечены как прочитанные:', updatedMessages)
            socket.emit('messagesMarkedAsRead', updatedMessages)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
}

export default startSocketIo
