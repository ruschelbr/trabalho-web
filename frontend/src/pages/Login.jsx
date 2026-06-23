import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FormPagina, FormTitulo, FormCampo, FormAcoes } from '../components/FormPagina.jsx'

function Login() {
  const [form, setForm] = useState({ email: '', senha: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  const isFormValid = form.email.trim() !== '' && form.senha.trim() !== ''

  const rodape = (
    <div className="py-4 px-5 registrar d-flex justify-content-center">
      <div>
        <label className="texto-claro">Não tem uma conta?</label>
        <Link to="/cadastro" className="links-animacao link-registrar mx-4">
          Registre-se
        </Link>
      </div>
    </div>
  )

  return (
    <FormPagina onSubmit={handleSubmit} rodape={rodape}>
      <FormTitulo>Login</FormTitulo>
      <FormCampo label="Email:">
        <input
          type="email"
          name="email"
          id="email-login"
          className="form-input linha-form"
          value={form.email}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Senha:">
        <input
          type="password"
          name="senha"
          id="senha-login"
          className="form-input linha-form"
          value={form.senha}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo>
        <div className="d-flex align-items-center gap-2">
          <input type="checkbox" name="lembrar" id="lembrar" className="checkbox linha-form" />
          <label htmlFor="lembrar" className="texto-escuro mb-0">
            Lembrar-me
          </label>
        </div>
      </FormCampo>
      <FormAcoes>
        <span className="btn-wrapper">
          <button type="submit" className="btn linha-form" disabled={!isFormValid}>
            Entrar
          </button>
        </span>
      </FormAcoes>
    </FormPagina>
  )
}

export default Login
