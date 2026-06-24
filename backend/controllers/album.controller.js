import model from "../models/album.model.js"

async function findAll(request, response) {
  try {
    const results = await model.findAll({ order: [['id', 'ASC']] })
    response.json(results).status(200)
  } catch (error) {
    console.log(error)
  }
}

// async function findById(request, response) --> precisa?

async function create(request, response) {
  try {
    const result = await model.create({
      name: request.body.name,
      release: request.body.release,
      type: request.body.type,
      cover: request.body.cover,
    })
    response.json(result).status(201)
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
    response.status(500).send("Erro ao deletar cliente")
  }
}

async function update(request, response) {
  try {
    const success = await model.update(
      {
        name: request.body.name,
        release: request.body.release,
        type: request.body.type,
        cover: request.body.cover,
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

export default { findAll, create, deleteById, update }
