import fs from 'fs'

export const dataProvinsi = async () => {
    try {
        const jsonString = fs.readFileSync('src/public/province.json')
        const data = JSON.parse(jsonString)
        return data
    } catch (err) {
        return err
    }
}
