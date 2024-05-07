import express from 'express'
import { addDevice, removeDevice } from '../controllers/deviceController.js'

const router = express.Router()

router.route("/add-device")
    .post(addDevice)

router.route("/remove-device")
    .delete(removeDevice)

export default router