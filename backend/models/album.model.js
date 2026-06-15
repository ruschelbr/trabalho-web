import { Model, Sequelize, DataTypes } from "sequelize"
import sequelize from "./dbconfig.js"

class Album extends Model {}

Album.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    release: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    cover: { type: DataTypes.STRING, allowNull: false }, //coloquei como string pq por enquanto a imagem vai ser da url
  },
  { sequelize, timestamps: true },
)

export default Album
