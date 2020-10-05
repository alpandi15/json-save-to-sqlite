import express from 'express'
import { getShadist } from '../../controlers/get/getController'

const router = express.Router()

router.get('/get-hadits/:id', getShadist)

export default router
