import model from "../models/user.model.js"

async function findAll(request, response) {
  try {
    const results = await model.findAll({
      attributes: { exclude: ["password"] },
    })
    response.json(results).status(200)
  } catch (error) {
    console.log(error)
  }
}

async function findById(request, response) {
  try {
    const result = await model.findByPk(request.params.id, {
      attributes: { exclude: ["password"] },
    })
    if (result == null) {
      return response.status(404).send()
    }
    response.json(result).status(200)
  } catch (error) {
    console.log(error)
  }
}

async function update(request, response) {
  try {
    const success = await model.update(
      {
        name: request.body.name,
        email: request.body.email,
        profilePicture: request.body.profilePicture,
        favoriteAlbumId: request.body.favoriteAlbumId,
      },
      { where: { id: request.params.id } },
    )
    if (success == 1) {
      response.status(200).send()
    } else {
      response.status(404).send()
    }
  } catch (error) {
    console.log(error)
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
    response.status(500).send("Erro ao deletar usuário")
  }
}

export default { findAll, findById, update, deleteById }
