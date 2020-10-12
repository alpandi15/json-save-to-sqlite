import express from 'express'
import { runCron } from '../../controlers/get/getController'

const router = express.Router()

router.get('/run', runCron)

export default router
