import express from "express"
import cors from "cors"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import router from "./routes/api.routes.js"
import sequelize from "./models/dbconfig.js"
import "./models/associations.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDir = path.join(__dirname, "uploads")

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir)
}

const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(`>> ${req.method} ${req.url}`)
  next()
})
app.use("/uploads", express.static(uploadsDir))
app.use("/api", router)

async function start() {
  await sequelize.sync({ alter: true })
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"))

}

start()