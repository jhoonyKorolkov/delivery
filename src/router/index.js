import express from 'express'
import authRoutes from './auth.js'
import advertisementsRoutes from './advertisement.js'

const router = express.Router()

router.use(authRoutes)
router.use(advertisementsRoutes)

export default router
