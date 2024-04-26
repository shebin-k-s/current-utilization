import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import { verifyToken } from "./middleware/authMiddleware.js"
import { utilizationRoute,authRoute, storeUtilizationRoute } from "./routes/index.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.use("/api/auth",authRoute)
app.use("/api/utilization",verifyToken,utilizationRoute)
app.use("/api/storeutilization",storeUtilizationRoute)


const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server running at ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })