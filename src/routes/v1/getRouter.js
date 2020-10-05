import express from 'express'
import { getShadist } from '../../controlers/get/getController'

const router = express.Router()

router.get('/get-hadits', getShadist)

export default router
