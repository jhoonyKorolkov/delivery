import express from 'express'

import { userSignIn, createUser, userLogOut } from '../controller/auth.js'

const authRoutes = express.Router()

authRoutes.post('/api/signin', userSignIn)
authRoutes.post('/api/signup', createUser)
authRoutes.get('/api/logout', userLogOut)

export default authRoutes
