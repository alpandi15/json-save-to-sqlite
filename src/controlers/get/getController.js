import corn from 'node-cron'
import fs from 'fs'
import axios from 'axios'

import { dataProvinsi } from '../../services/get/getService'

export const runCron = async (req, res) => {
    const province = await dataProvinsi()

    // res.json(province)
    let jsonData = []

    const totalData = province.length - 1
    let totalGet = 0
    corn.schedule('*/5 * * * * *', async () => {
        if (totalData > totalGet) {
            console.log('Get Data ', totalGet, province[totalGet].nama)
            const query = `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${province[totalGet].id}`
            const response = await axios.get(query)
            // console.log(response.data.kota_kabupaten)

            fs.writeFileSync(`src/public/data_json/${province[totalGet].nama}.json`, JSON.stringify(response.data.kota_kabupaten || {}))
            totalGet += 1
        }else {
            console.log('Selesai')
            totalGet = 0
        }
    })
}
