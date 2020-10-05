import corn from 'node-cron'
import fs from 'fs'
import axios from 'axios'

export const getShadist = async (req, res) => {
    const { id } = req.params
    if (!id) {
        res.send({
            'message': 'Required parameter ID'
        })
    }

    const kitab = 'Shahih_Bukhari'
    let numberOfHadits = 1
    const totalHadits = 7008
    corn.schedule('*/10 * * * * *', async () => {
        if (1 >= numberOfHadits) {
            const query = `http://api.carihadis.com/?kitab=${kitab}&id=${numberOfHadits}`
            const response = await axios.get(query)
            const jsonString = JSON.stringify(response.data)

            console.log('query', response)
        } else {
            res.send({
                message: 'Success'
            })
        }

        numberOfHadits += 1
    })
}
