import mongoose from 'mongoose'
import { MONGO_URI } from './src/config/_config.js'

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
    }
}

export default connectDB
