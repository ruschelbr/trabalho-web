import "./backend/models/associations.js"
import Album from "./backend/models/album.model.js"
import Comment from "./backend/models/comment.model.js"
import Contact from "./backend/models/contact.model.js"
import Song from "./backend/models/song.model.js"
import User from "./backend/models/user.model.js"

await Album.sync()
await User.sync()
await Song.sync()
await Comment.sync()
await Contact.sync()

// await Client.create({ name: "Seila Souza", document: "444.123.567-33" })

// const results = await Album.findAll()


// for (let res of results) {
//     console.log(res.dataValues)
// }

