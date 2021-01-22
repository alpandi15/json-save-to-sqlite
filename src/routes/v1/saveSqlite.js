import express from 'express'
import { saveToSQL } from '../../controlers/sqlite/sqliteController'

const router = express.Router()

router.get('/save-tosql', saveToSQL)

export default router
