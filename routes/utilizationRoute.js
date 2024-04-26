import express from 'express'
import { fetchUnitConsumed, fetchUtilization, getAllUtilizationData, storeUtilizationData } from '../controllers/utilizationController.js'

const router = express.Router()


router.route("/")
    .get(getAllUtilizationData)

router.route("/unitconsumed")
    .get(fetchUnitConsumed)
router.route("/history")
    .get(fetchUtilization)







export default router