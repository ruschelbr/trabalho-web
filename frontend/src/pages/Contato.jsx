import { useState } from 'react'
import { FormPagina, FormTitulo, FormCampo, FormAcoes } from '../components/FormPagina.jsx'
import api from '../api/api.js'

function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' })
  const [feedback, setFeedback] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const result = await api.createContact({
        name: form.nome,
        email: form.email,
        text: form.mensagem,
      })
      if (result.status === 201) {
        setFeedback({ tipo: 'sucesso', mensagem: 'Mensagem enviada com sucesso!' })
        setForm({ nome: '', email: '', mensagem: '' })
      }
    } catch (error) {
      console.log(error)
      setFeedback({ tipo: 'erro', mensagem: 'Erro ao enviar mensagem. Tente novamente.' })
    }
  }

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo>Contato</FormTitulo>
      <FormCampo label="Nome:" htmlFor="nome-contato">
        <input
          type="text"
          name="nome"
          id="nome-contato"
          className="form-input linha-form"
          value={form.nome}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Email:" htmlFor="email-contato">
        <input
          type="email"
          name="email"
          id="email-contato"
          className="form-input linha-form"
          value={form.email}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Mensagem:" htmlFor="mensagem-contato">
        <textarea
          name="mensagem"
          id="mensagem-contato"
          className="form-input linha-form textarea-contato"
          rows={5}
          value={form.mensagem}
          onChange={handleChange}
        />
      </FormCampo>
      {feedback && (
        <p className={feedback.tipo === 'sucesso' ? 'texto-sucesso' : 'texto-erro'} style={{ textAlign: 'center', padding: '0 1.5rem' }}>
          {feedback.mensagem}
        </p>
      )}
      <FormAcoes>
        <span className="btn-wrapper">
          <button type="submit" className="btn linha-form" disabled={!(form.nome.trim() && form.email.trim() && form.mensagem.trim())}>
            Enviar
          </button>
        </span>
      </FormAcoes>
    </FormPagina>
  )
}

export default Contato
