import { Model, Sequelize, DataTypes } from "sequelize"
import sequelize from "./dbconfig.js"
import Album from "./album.model.js"

class Song extends Model {}

Song.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    youtubeLink: { type: DataTypes.STRING, allowNull: false },
    tracklistPosition: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, timestamps: true },
)



export default Song
