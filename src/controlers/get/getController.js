import corn from 'node-cron'
import fs from 'fs'
import axios from 'axios'

import { dataProvinsi, dataKecamatan, getFilenameProv, dataDetailKecamatan } from '../../services/get/getService'

export const runCron = async (req, res) => {
    const province = await dataProvinsi()

    const totalData = province.length - 1
    let totalGet = 0
    const task = corn.schedule('*/5 * * * * *', async () => {
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
            task.destroy()
        }
    })
}


export const getKecamatan = async (req, res) => {
    const dataProvinsi = await getFilenameProv()

    const totalProvinsi = dataProvinsi.length - 1
    let countTotalProv = 0

    let detailKecamatan = null

    let totalData = 0
    let totalGet = 0
    const task = corn.schedule('*/4 * * * * *', async () => {
        if (!detailKecamatan) {
            detailKecamatan = await dataDetailKecamatan(dataProvinsi[countTotalProv])
            totalData = detailKecamatan.length - 1
        } else {
            if ((totalData >= totalGet) || (totalProvinsi >= countTotalProv)) {
                console.log('Getting ', detailKecamatan[totalGet])
                const query = `https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${detailKecamatan[totalGet].id}`
                const response = await axios.get(query)
                // console.log('Response ', response.data.kecamatan)
                fs.writeFileSync(`${global.appRoot}/src/public/kecamatan/${dataProvinsi[countTotalProv].split('.')[0]}/${detailKecamatan[totalGet].nama}.json`, JSON.stringify(response.data.kecamatan || {}))

                totalGet += 1
                if ((totalData < totalGet)) {
                    detailKecamatan = null
                    totalGet = 0
                    countTotalProv += 1

                    const namaKota = dataProvinsi[countTotalProv].split('.')[0]
                    console.log('Create Kota ', namaKota)

                    const dir = `${global.appRoot}/src/public/kecamatan/${namaKota}`
                    console.log(dir)
                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir);
                    }
                    console.log('Ganti Provinsi ', namaKota)
                }
            } else {
                console.log('Selesai')
                task.destroy()
            }
        }
        // if (totalData > totalGet) {
        //     console.log(dataProvinsi[totalGet])
        //     console.log('Data Kecamatan ', detailKecamatan)
        //     totalGet += 1
        // }else {
        //     console.log('Selesai')
        //     totalGet = 0
        //     totalKecamatan += 1
        //     task.destroy()
        // }
    })
    // res.json(dataProvinsi)
}
