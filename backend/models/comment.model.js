import { Model, Sequelize, DataTypes } from "sequelize"
import sequelize from "./dbconfig.js"

class Comment extends Model {}

Comment.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, timestamps: true },
)



export default Comment