import 'dotenv/config'

const PORT = process.env.PORT || 3000
const BASE_URL = `http://localhost`
const MONGO_URI =
    process.env.MONGO_URI ||
    'mongodb://root:example@mongo:27017/delivery?authSource=admin'

export { PORT, MONGO_URI, BASE_URL }
