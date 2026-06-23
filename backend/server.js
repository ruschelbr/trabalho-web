import express from "express"
import cors from "cors"
import router from "./routes/api.routes.js"
import sequelize from "./models/dbconfig.js"
import Album from "./models/album.model.js"
import Comment from "./models/comment.model.js"
import Contact from "./models/contact.model.js"
import Song from "./models/song.model.js"
import User from "./models/user.model.js"
import "./models/associations.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", router)

async function start() {
  await sequelize.sync()
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"))

}

start()