import fs from 'fs'
import path from 'path'

const basename = path.basename(module.filename)

export const getFilenameProv = () => {
    let fileName = []
    fs.readdirSync(`${global.appRoot}/src/public/data_json`)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-4) === 'json'))
    .forEach((file) => {
        fileName.push(file)
    })

    return fileName
}

export const dataProvinsi = async () => {
    try {
        const jsonString = fs.readFileSync('src/public/province.json')
        const data = JSON.parse(jsonString)
        return data
    } catch (err) {
        return err
    }
}


export const dataKecamatan = async () => {
    try {
        return getFilenameProv()
    } catch (err) {
        return err
    }
}

export const dataDetailKecamatan = async (filename) => {
    try {
        const jsonString = fs.readFileSync(`${global.appRoot}/src/public/data_json/${filename}`)
        const data = JSON.parse(jsonString)
        return data
    } catch (err) {
        return err
    }
}
