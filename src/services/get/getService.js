import fs from 'fs'

export const dataHadits = async () => {
    try {
        const jsonString = fs.readFileSync('src/public/hadits.json')
        const data = JSON.parse(jsonString)
        return data
    } catch (err) {
        return err
    }
}
