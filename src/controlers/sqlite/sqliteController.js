import sqlite3 from 'sqlite3'
import path from 'path'
import corn from 'node-cron'
import { readFileJson } from '../../services/get/getService'

const dbPath = path.resolve(`src/public/sqlite`, 'data.sqlite')
const db = new sqlite3.Database(dbPath)

export const saveToSQL = async (req, res) => {
    let jsonData = await readFileJson(`${global.appRoot}/src/public/sqlite/data.json`)
    let countInsert = 0
    const totalData = jsonData.length

    const task = corn.schedule('*/1 * * * * *', async () => {
        db.serialize(function () {
            var stmt = db.prepare("INSERT INTO kabupaten VALUES (?, ?, ?, ?)");
            if (totalData > countInsert) {
                console.log(`Inserting data ${jsonData[countInsert].kabko}`)
                stmt.run(null, jsonData[countInsert].kabko, jsonData[countInsert].lat, jsonData[countInsert].long)
                countInsert += 1
            } else {
                stmt.finalize();
                console.log('Selesai')
                countInsert = 0
                task.destroy()
                db.close();
            }
        })
    })
    return res.send(jsonData)
}