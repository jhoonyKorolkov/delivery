import express from 'express'
import upload from '../middleware/uploadHandler.js'
import {
    getAdvertisements,
    getAdvertisementById,
    createAdvertisement,
    softDeleteAdvertisement,
} from '../controller/advertisements.js'

const advertisementsRoutes = express.Router()

advertisementsRoutes.get('/api/advertisements', getAdvertisements)
advertisementsRoutes.get('/api/advertisements/:id', getAdvertisementById)
advertisementsRoutes.post(
    '/api/advertisements',
    upload.array('images', 3),
    createAdvertisement
)
advertisementsRoutes.delete('/api/advertisements/:id', softDeleteAdvertisement)

export default advertisementsRoutes
