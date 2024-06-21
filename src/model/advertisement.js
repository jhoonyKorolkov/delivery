import { Schema, model, Types } from 'mongoose'

const AdvertisementSchema = new Schema({
    shortTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    images: {
        type: [String],
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    tags: {
        type: [String],
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },
})

class AdvertisementClass {
    static async getAllAdvertisement(filter) {
        try {
            const adv = await this.find(filter).populate('userId', 'name')
            return adv
        } catch (error) {
            console.error('Error in getAllAdvertisement:', error)
            return null
        }
    }

    static async getAdvertisementById(id) {
        try {
            const adv = await this.findOne({
                _id: id,
                isDeleted: false,
            }).populate('userId', 'name')
            return adv
        } catch (error) {
            console.error('Error in getAdvertisementById:', error)
            return null
        }
    }

    static async createAdvertisement(data) {
        try {
            const adv = await this.create(data)
            return adv
        } catch (error) {
            console.error('Error in createAdvertisement:', error)
            return null
        }
    }

    static async softDeleteAdvertisement(id) {
        try {
            const adv = await this.findByIdAndUpdate(id, { isDeleted: true })
            return adv
        } catch (error) {
            console.error('Error in deleteAdvertisement:', error)
            return null
        }
    }
}

AdvertisementSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.__v
    delete obj.isDeleted
    return obj
}

AdvertisementSchema.loadClass(AdvertisementClass)

const Advertisement = model('Advertisement', AdvertisementSchema)

export default Advertisement
