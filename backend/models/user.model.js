import { Model, Sequelize, DataTypes } from "sequelize"
import sequelize from "./dbconfig.js"
import Album from "./album.model.js"

class User extends Model {}

User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull:false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    profilePicture: { type: DataTypes.STRING, allowNull:false }, //de novo, string pq por enquanto vai ser a url
    admin: { type: DataTypes.BOOLEAN, allowNull: false }
}, {sequelize, timestamps: true})



export default User