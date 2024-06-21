import multer from 'multer'
import path from 'path'
import AppError from './AppError.js'

const __dirname = path.resolve()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'uploads', 'images')
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + Date.now() + fileExtension)
    },
})

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/

    const extname = fileTypes.test(file.originalname.toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb(new AppError('Доступен формат jpeg, jpg, png, gif', 400))
    }
}

const upload = multer({ storage: storage, fileFilter })

export default upload
