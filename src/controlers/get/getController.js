import corn from 'node-cron'
import fs from 'fs'
import axios from 'axios'

import { dataHadits } from '../../services/get/getService'

export const getShadist = async (req, res) => {
    const kitab = 'Shahih_Bukhari'
    let numberOfHadits = 1
    const totalHadits = 7008

    const hadits = await dataHadits()
    res.send(hadits)
    // corn.schedule('*/5 * * * * *', async () => {
    //     if (1 >= numberOfHadits) {
    //         const query = `http://api.carihadis.com/?kitab=${kitab}&id=${numberOfHadits}`
    //         const response = await axios.get(query)
    //         const jsonString = JSON.stringify(response.data)

    //         fs.writeFileSync(`src/public/data_json/Shahih_Bukhari.json`, jsonString)
    //         console.log('query', response)
    //     } else {
    //         res.send({
    //             message: 'Success'
    //         })
    //     }

    //     numberOfHadits += 1
    // })
}
