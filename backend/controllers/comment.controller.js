import model from "../models/comment.model.js"
import User from "../models/user.model.js"
import sequelize from "../models/dbconfig.js"
import "../models/associations.js"

async function findBySong(request, response) {
  try {
    const songId = parseInt(request.params.songId)
    const results = await model.findAll({
      where: { SongId: songId },
      include: { model: User, attributes: ["id", "name", "profilePicture"] },
      order: [
        [sequelize.literal('"pinnedAt" IS NULL'), 'ASC'],
        ['pinnedAt', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    })
    response.status(200).json(results)
  } catch (error) {
    console.log(error)
    response.status(500).send("Erro ao buscar comentários")
  }
}

async function create(request, response) {
  try {
    if (!request.body.text || !request.body.text.trim()) {
      return response.status(400).json({ message: "O comentário não pode estar vazio" })
    }

    if (!request.body.SongId) {
      return response.status(400).json({ message: "SongId é obrigatório" })
    }

    const created = await model.create({
      text: request.body.text,
      SongId: request.body.SongId,
      UserId: request.UserId
    })

    const result = await model.findByPk(created.id, {
      include: { model: User, attributes: ["id", "name", "profilePicture"] },
    })

    response.status(201).json(result)
  } catch (error) {
    console.log(error)
    response.status(500).send("Erro ao criar comentário")
  }
}

async function pin(request, response) {
  try {
    console.log('[PIN] params.id:', request.params.id, '| UserId:', request.UserId)
    const user = await User.findByPk(request.UserId)
    console.log('[PIN] user.id:', user?.id, '| admin:', user?.admin)
    if (!user?.admin) {
      return response.status(403).json({ message: "Apenas o admin pode fixar comentários." })
    }

    const comment = await model.findByPk(request.params.id)
    console.log('[PIN] comment:', comment?.id ?? 'NÃO ENCONTRADO')
    if (!comment) return response.status(404).send()

    const pinnedAt = comment.pinnedAt ? null : new Date()
    await comment.update({ pinnedAt })
    response.status(200).json({ pinnedAt })
  } catch (error) {
    console.log(error)
    response.status(500).send("Erro ao fixar comentário")
  }
}

async function deleteById(request, response) {
  try {
    const comment = await model.findByPk(request.params.id)
    if (!comment) return response.status(404).send()

    const user = await User.findByPk(request.UserId)
    if (!user?.admin && comment.UserId !== request.UserId) {
      return response.status(403).json({ message: "Sem permissão para excluir este comentário." })
    }

    await comment.destroy()
    response.status(200).send()
  } catch (error) {
    console.log(error)
    response.status(500).send("Erro ao deletar comentário")
  }
}

export default { findBySong, create, pin, deleteById }
