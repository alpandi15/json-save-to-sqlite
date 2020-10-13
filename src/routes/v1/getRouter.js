import express from 'express'
import { runCron, getKecamatan, getKelurahan } from '../../controlers/get/getController'

const router = express.Router()

router.get('/run', runCron)
router.get('/get-kecamatan', getKecamatan)
router.get('/get-kelurahan', getKelurahan)

export default router
