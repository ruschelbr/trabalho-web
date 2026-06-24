import { Sequelize } from "sequelize"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../.env") })
console.log("=== TESTE DE CONEXÃO ===")
console.log("DB_HOST:", process.env.DB_HOST)
console.log(
  "DB_PASSWORD:",
  process.env.DB_PASSWORD ? "Encontrada" : "NÃO ENCONTRADA (UNDEFINED)",
)
console.log("========================")

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbHost = process.env.DB_HOST
const dbPassword = process.env.DB_PASSWORD

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres",
  host: dbHost,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

export default sequelize
