import { readFileJson } from '../../services/get/getService'
export const saveToSQL = async (req, res) => {
    let jsonData = await readFileJson(`${global.appRoot}/src/public/sqlite/data.json`)
    console.log('Test ')
    return res.send(jsonData)
}