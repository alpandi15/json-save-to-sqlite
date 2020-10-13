import express from 'express'
import { runCron, getKecamatan } from '../../controlers/get/getController'

const router = express.Router()

router.get('/run', runCron)
router.get('/get-kecamatan', getKecamatan)

export default router
