import { Model, Sequelize, DataTypes } from "sequelize"
import sequelize from "./dbconfig.js"

class Contact extends Model {}

Contact.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, timestamps: true },
)

export default Contact