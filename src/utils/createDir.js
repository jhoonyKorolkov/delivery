import fs from 'fs'

const createDirIfNotExists = async dirPath => {
    try {
        await fs.promises.mkdir(dirPath, { recursive: true })
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
}

export default createDirIfNotExists
