import { useState } from 'react'
import { FormPagina, FormTitulo, FormCampo, FormAcoes, FormUpload } from '../components/FormPagina.jsx'

function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  const isFormValid = form.nome.trim() !== '' && form.email.trim() !== '' && form.senha.trim() !== ''

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo>Cadastro</FormTitulo>
      <FormCampo label="Nome:">
        <input
          type="text"
          name="nome"
          id="nome-cadastro"
          className="form-input linha-form"
          value={form.nome}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Email:">
        <input
          type="email"
          name="email"
          id="email-cadastro"
          className="form-input linha-form"
          value={form.email}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Senha:">
        <input
          type="password"
          name="senha"
          id="senha-cadastro"
          className="form-input linha-form"
          value={form.senha}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Álbum favorito:">
        <select name="album" id="album-cadastro" className="dropdown-form linha-form">
          <option value="sunset">Splippleman at Sunset Sound... Lost, Now Found</option>
          <option value="night">Still Night Blue</option>
          <option value="magic">Welcome to the Magic Room</option>
        </select>
      </FormCampo>
      <FormUpload id="perfil-cadastro" name="perfil" label="Foto de perfil:" />
      <FormAcoes>
        <span className="btn-wrapper">
          <button type="submit" className="btn linha-form texto-escuro" disabled={!isFormValid}>
            Cadastrar
          </button>
        </span>
      </FormAcoes>
    </FormPagina>
  )
}

export default Cadastro
