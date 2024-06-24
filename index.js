import express from 'express'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServer } from 'http'
import { PORT } from './src/config/_config.js'
import connectDB from './db.js'
import startSocketIo from './socket.js'
import configureApp from './src/config/configureApp.js'
import configureRoutes from './src/config/configureRoutes.js'
import { errorHandler, notFoundHandler } from './src/middleware/errorHandler.js'
import createDirIfNotExists from './src/utils/createDir.js'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dirPath = path.join(__dirname, '/uploads/images')

const app = express()
const server = createServer(app)

const startServer = async () => {
    await createDirIfNotExists(dirPath)
    await connectDB()
    app.use(
        cors({
            origin: 'http://localhost:5173', // для теста чата на клиенте
            credentials: true,
        })
    )

    configureApp(app)
    configureRoutes(app)

    startSocketIo(server)

    app.use(notFoundHandler)
    app.use(errorHandler)
    server.listen(PORT, () => {
        console.log(`App running on port ${PORT}`)
    })
}

startServer()
