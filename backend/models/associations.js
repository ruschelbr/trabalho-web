import Album from "./album.model.js"
import Song from "./song.model.js"
import Comment from "./comment.model.js"
import User from "./user.model.js"

Album.hasMany(Song)
Song.belongsTo(Album)

Song.hasMany(Comment)
Comment.belongsTo(Song)

User.hasMany(Comment)
Comment.belongsTo(User)

User.belongsTo(Album, { foreignKey: "favoriteAlbumId" })