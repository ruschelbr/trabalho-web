import model from "../models/contact.model.js"
import nodemailer from "nodemailer"

async function create(request, response) {
  try {
    const contact = await model.create({
      name: request.body.name,
      email: request.body.email,
      text: request.body.text,
    })

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        })

        await transporter.sendMail({
          from: `"${request.body.name}" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          replyTo: request.body.email,
          subject: `Contato de ${request.body.name}`,
          text: request.body.text,
        })
      } catch (emailError) {
        console.log("Erro ao enviar email:", emailError)
      }
    }

    response.status(201).json(contact)
  } catch (error) {
    console.log(error)
    response.status(500).send("Erro ao enviar mensagem")
  }
}

async function findAll(request, response) {
  try {
    const results = await model.findAll()
    response.json(results).status(200)
  } catch (error) {
    console.log(error)
  }
}

export default { create, findAll }
