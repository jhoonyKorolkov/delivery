import AppError from '../middleware/AppError.js'
import Advertisement from '../model/advertisement.js'

const getAdvertisementsService = async params => {
    const filter = { isDeleted: false }
    const { shortTitle, description, userId, tags } = params

    if (shortTitle) {
        filter.shortTitle = { $regex: shortTitle, $options: 'i' }
    }

    if (description) {
        filter.description = { $regex: description, $options: 'i' }
    }

    if (tags) {
        filter.tags = { $all: tags }
    }

    if (userId) {
        const adv = await Advertisement.getAdvertisementById(userId)
        if (!adv) {
            throw new AppError('Advertisement not found', 404)
        }
        return adv
    }

    const ads = await Advertisement.getAllAdvertisement(filter)

    if (!ads.length) {
        throw new AppError('No advertisements found', 404)
    }

    return ads
}

const getAdvertisementByIdService = async id => {
    const ad = await Advertisement.getAdvertisementById(id)

    if (!ad) {
        throw new AppError('Advertisement not found', 404)
    }

    return ad
}

const softDeleteAdvertisementService = async id => {
    const ad = await Advertisement.softDeleteAdvertisement(id)

    if (!ad) {
        throw new AppError('Advertisement not found', 404)
    }

    return ad
}

const createAdvertisementService = async advertisement => {
    const ad = await Advertisement.createAdvertisement(advertisement)

    return ad
}

export {
    getAdvertisementsService,
    getAdvertisementByIdService,
    createAdvertisementService,
    softDeleteAdvertisementService,
}
