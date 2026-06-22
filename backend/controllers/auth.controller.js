import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/user.model.js"

const secret = process.env["AUTH_SECRET"]

function getToken(uid, uemail) {
  return jwt.sign({ sub: uid, email: uemail }, secret, { expiresIn: "7d" })
}

function validarSenha(senha) {
  if (senha.length < 8) return "A senha deve ter pelo menos 8 caracteres"
  if (!/[0-9]/.test(senha)) return "A senha deve ter pelo menos 1 número"
  if (!/[A-Z]/.test(senha)) return "A senha deve ter pelo menos 1 letra maiúscula"
  if (!/[a-z]/.test(senha)) return "A senha deve ter pelo menos 1 letra minúscula"
  return null
}

async function register(request, response) {
  try {
    const erroSenha = validarSenha(request.body.password)
    if (erroSenha) {
      return response.status(400).json({ message: erroSenha })
    }

    const existing = await User.findOne({ where: { email: request.body.email } })
    if (existing) {
      return response.status(409).json({ message: "Email já cadastrado" })
    }

    const hashedPassword = bcrypt.hashSync(request.body.password, 10)
    const user = await User.create({
      name: request.body.name,
      email: request.body.email,
      password: hashedPassword,
      profilePicture: request.body.profilePicture || "",
      admin: false,
    })

    const token = getToken(user.id, user.email)
    response.status(201).json({ token, userId: user.id, admin: user.admin })
  } catch (error) {
    console.log(error)
    response.status(500).send()
  }
}

async function login(request, response) {
  try {
    const user = await User.findOne({ where: { email: request.body.email } })
    if (!user) {
      return response.status(401).json({ message: "Email ou senha incorretos" })
    }

    const passwordMatch = bcrypt.compareSync(request.body.password, user.password)
    if (!passwordMatch) {
      return response.status(401).json({ message: "Email ou senha incorretos" })
    }

    const token = getToken(user.id, user.email)
    response.status(200).json({ token, userId: user.id, admin: user.admin })
  } catch (error) {
    console.log(error)
    response.status(500).send()
  }
}

async function validateToken(request, response, next) {
  try {
    const authHeader = request.headers["authorization"]
    if (!authHeader) {
      return response.status(401).json({ message: "Token não fornecido" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, secret)
    request.userId = decoded.sub
    request.userEmail = decoded.email
    next()
  } catch (error) {
    response.status(401).json({ message: "Token inválido" })
  }
}

export default { register, login, validateToken }
