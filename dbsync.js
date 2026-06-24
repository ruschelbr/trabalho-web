import "./backend/models/associations.js"
import Album from "./backend/models/album.model.js"
import Comment from "./backend/models/comment.model.js"
import Contact from "./backend/models/contact.model.js"
import Song from "./backend/models/song.model.js"
import User from "./backend/models/user.model.js"

// alter: true faz o Sequelize comparar o schema do model com a tabela já
// existente no banco e ADICIONAR colunas/constraints que estiverem faltando
// (ex: a coluna UserId em Comments, se a tabela foi criada antes dessa
// associação existir). Sem alter, sync() só cria tabelas que não existem
// ainda -- não corrige tabelas já criadas com schema desatualizado.
await Album.sync({ alter: true })
await User.sync({ alter: true })
await Song.sync({ alter: true })
await Comment.sync({ alter: true })
await Contact.sync({ alter: true })

console.log("Banco sincronizado (tabelas criadas/atualizadas).")

// await Client.create({ name: "Seila Souza", document: "444.123.567-33" })

// const results = await Album.findAll()


// for (let res of results) {
//     console.log(res.dataValues)
// }

