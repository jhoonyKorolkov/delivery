import { ensureAuthenticated, ensureForbidden } from '../middleware/auth.js'
import {
    getAdvertisementsService,
    getAdvertisementByIdService,
    createAdvertisementService,
    softDeleteAdvertisementService,
} from '../service/advertisements.js'

const getAdvertisements = async (req, res, next) => {
    const params = req.query
    try {
        const ads = await getAdvertisementsService(params)
        res.json({ data: ads, status: 'ok' })
    } catch (error) {
        next(error)
    }
}

const getAdvertisementById = async (req, res, next) => {
    try {
        const { id } = req.params
        const ad = await getAdvertisementByIdService(id)
        res.json({ data: ad, status: 'ok' })
    } catch (error) {
        next(error)
    }
}

const softDeleteAdvertisement = async (req, res, next) => {
    try {
        const { id } = req.params
        await softDeleteAdvertisementService(id)
        res.json({ status: 'ok' })
    } catch (error) {
        next(error)
    }
}

const createAdvertisement = async (req, res, next) => {
    try {
        await ensureAuthenticated(req)
        await ensureForbidden(req)

        const filesPath = req.files.map(file => file.path)

        const data = {
            images: filesPath,
            userId: req.user._id,
            shortTitle: req.body.shortTitle,
            description: req.body.description,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
            tags: req.body.tags,
            isDeleted: req.body.isDeleted,
        }

        const ad = await createAdvertisementService(data)
        res.json({ data: ad, status: 'ok' })
    } catch (error) {
        next(error)
    }
}

export {
    getAdvertisements,
    getAdvertisementById,
    createAdvertisement,
    softDeleteAdvertisement,
}
