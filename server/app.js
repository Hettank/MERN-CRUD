import express from "express"
import connectDB from "./config/db.js"
import employeeRoutes from "./routes/employeeRoutes.js"
import cors from "cors"

const app = express()
const PORT = process.env.PORT

connectDB()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("./uploads"))

app.use('/api/employees', employeeRoutes)

app.listen(PORT, () => {
    console.log("listening on port 8000")
})