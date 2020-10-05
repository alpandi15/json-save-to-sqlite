import corn from 'node-cron'
import fs from 'fs'
import axios from 'axios'

import { dataHadits } from '../../services/get/getService'

export const getShadist = async (req, res) => {
    const { params } = req

    if (!params.id) {
        res.send({
            message: 'Required parameter ID of Hadits'
        })
    }
    const hadits = await dataHadits()
    let index = params.id
    console.log('Params: ', index)

    let jsonData = []
    let kitab
    const numberHadits = (hadits[index].totalHadits).split('-')
    let numberOfHadits = Number(numberHadits[0])
    const totalHadits =  Number(numberHadits[1])

    corn.schedule('*/5 * * * * *', async () => {
        kitab = hadits[index].name
        if (numberOfHadits < totalHadits) {
            console.log('Total Hadits ', totalHadits)
            const query = `http://api.carihadis.com/?kitab=${kitab}&id=${numberOfHadits}`

            console.log('GET ', query)
            const response = await axios.get(query)
            jsonData.push(response.data.data['1'] || {})
            numberOfHadits += 1

        } else {
            console.log('Selesai')
            console.log(jsonData)
            fs.writeFileSync(`src/public/data_json/${kitab}.json`, JSON.stringify(jsonData))
            index += 1,
            numberOfHadits = 1
        }
    })
}
