import model from "../models/comment.model.js"
import User from "../models/user.model.js"
import Song from "../models/song.model.js"
import "../models/associations.js"

// GET /songs/:songId/comments
// Busca os comentários de uma música, já trazendo o nome/foto de quem comentou
async function findBySong(request, response) {
  try {
    const songId = parseInt(request.params.songId)
    const results = await model.findAll({
      where: { SongId: songId },
      include: { model: User, attributes: ["id", "name", "profilePicture"] },
      order: [["createdAt", "DESC"]],
    })
    response.status(200).json(results)
  } catch (error) {
    console.log(error)
    response.status(500).send("Erro ao buscar comentários")
  }
}

// POST /comments (autenticado)
// O autor do comentário vem do token (request.UserId, setado pelo
// authController.validateToken), não do body -- assim ninguém comenta
// fingindo ser outro usuário
async function create(request, response) {
  try {
    if (!request.body.text || !request.body.text.trim()) {
      return response
        .status(400)
        .json({ message: "O comentário não pode estar vazio" })
    }

    if (!request.body.SongId) {
      return response
        .status(400)
        .json({ message: "SongId é obrigatório" })
    }

    const created = await model.create({
      text: request.body.text,
      SongId: request.body.SongId,
      UserId: request.UserId
    })

    // Busca de novo já incluindo os dados do usuário, pra devolver pronto pro front renderizar
    const result = await model.findByPk(created.id, {
      include: { model: User, attributes: ["id", "name", "profilePicture"] },
    })

    response.status(201).json(result)
  } catch (error) {
    console.log(error)
    response.status(500).send("Erro ao criar comentário")
  }
}

async function deleteById(request, response) {
  try {
    const success = await model.destroy({ where: { id: request.params.id } })
    if (success == 1) {
      response.status(200).send()
    } else {
      response.status(404).send()
    }
  } catch (error) {
    console.log(error)
    response.status(500).send("Erro ao deletar comentário")
  }
}

export default { findBySong, create, deleteById }
