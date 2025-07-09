import express from "express"
import cors from "cors"
import authRoute from "./routes/auth_route.js"

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoute)

app.listen(5000, () => console.log("Server running"))
