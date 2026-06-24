import model from "../models/user.model.js"
import bcrypt from "bcryptjs"

async function create(request, response) {
  try {
    const hashedPassword = bcrypt.hashSync(request.body.password, 10)
    const result = await model.create({
      name: request.body.name,
      email: request.body.email,
      password: hashedPassword,
      profilePicture: request.body.profilePicture,
      admin: request.body.admin ?? false,
      favoriteAlbumId: request.body.favoriteAlbumId
    })
    const { password, ...userWithoutPassword } = result.toJSON()
    response.status(201).json(userWithoutPassword)
  } catch (error) {
    console.log(error)
    response.status(500).send("Erro ao criar usuário")
  }
}

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

const emojiRegex = /\p{Extended_Pictographic}/u

function validarSenha(senha) {
  if (senha.length < 8) return "A senha deve ter pelo menos 8 caracteres"
  if (!/[0-9]/.test(senha)) return "A senha deve ter pelo menos 1 número"
  if (!/[A-Z]/.test(senha)) return "A senha deve ter pelo menos 1 letra maiúscula"
  if (!/[a-z]/.test(senha)) return "A senha deve ter pelo menos 1 letra minúscula"
  return null
}

async function update(request, response) {
  try {
    if (request.body.name && emojiRegex.test(request.body.name)) {
      const user = await model.findByPk(request.UserId)
      if (!user?.admin) {
        return response.status(403).json({ message: 'Apenas o admin pode usar emojis no nome.' })
      }
    }

    // Troca de senha: exige senha atual e valida a nova
    const campos = {
      name: request.body.name,
      email: request.body.email,
      profilePicture: request.body.profilePicture,
      favoriteAlbumId: request.body.favoriteAlbumId,
    }

    if (request.body.newPassword) {
      const erroSenha = validarSenha(request.body.newPassword)
      if (erroSenha) {
        return response.status(400).json({ message: erroSenha })
      }

      // Busca o usuário com a senha para verificar a senha atual
      const user = await model.findByPk(request.params.id)
      if (!user) return response.status(404).send()

      const senhaCorreta = bcrypt.compareSync(request.body.currentPassword, user.password)
      if (!senhaCorreta) {
        return response.status(401).json({ message: "Senha atual incorreta" })
      }

      campos.password = bcrypt.hashSync(request.body.newPassword, 10)
    }

    const success = await model.update(campos, { where: { id: request.params.id } })

    if (success == 1) {
      response.status(200).send()
    } else {
      response.status(404).send()
    }
  } catch (error) {
    console.log(error)
    response.status(500).send()
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

export default { create, findAll, findById, update, deleteById }