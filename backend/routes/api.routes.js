import express from "express"
import multer from "multer"
import albumController from "../controllers/album.controller.js"
import songController from "../controllers/song.controller.js"
import userController from "../controllers/user.controller.js"
import contactController from "../controllers/contact.controller.js"
import authController from "../controllers/auth.controller.js"
import commentController from "../controllers/comment.controller.js"

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 3 * 1024 * 1024 } })

// Auth (público)
router.post("/register", authController.register)
router.post("/login", authController.login)

// Upload
router.post("/upload", authController.validateToken, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "Nenhuma imagem enviada" })
  const base64 = req.file.buffer.toString("base64")
  const dataUri = `data:${req.file.mimetype};base64,${base64}`
  res.status(200).json({ path: dataUri })
})

// Albums
router.get("/albums", albumController.findAll)
router.post("/albums", authController.validateToken, albumController.create)
router.put("/albums/:id", authController.validateToken, albumController.update)
router.delete("/albums/:id", authController.validateToken, albumController.deleteById)

// Songs
router.get("/songs", songController.findAll)
router.get("/songs/:id", songController.findById)
router.get("/albums/:albumId/songs", songController.findSongsOfAlbum)
router.post("/songs", authController.validateToken, songController.create)
router.put("/songs/:id", authController.validateToken, songController.update)
router.delete("/songs/:id", authController.validateToken, songController.deleteById)

// Users
router.get("/users", authController.validateToken, userController.findAll)
router.get("/users/:id", authController.validateToken, userController.findById)
router.post("/users", userController.create)
router.put("/users/:id", authController.validateToken, userController.update)
router.delete("/users/:id", authController.validateToken, userController.deleteById)

// Contacts
router.post("/contacts", contactController.create)
router.get("/contacts", authController.validateToken, contactController.findAll)

// Comments
router.get("/songs/:songId/comments", commentController.findBySong)
router.post("/comments", authController.validateToken, commentController.create)
router.patch("/comments/:id/pin", authController.validateToken, commentController.pin)
router.delete("/comments/:id", authController.validateToken, commentController.deleteById)

export default router
