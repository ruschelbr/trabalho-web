import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormPagina, FormTitulo, FormCampo, FormAcoes } from '../components/FormPagina.jsx'
import api from '../api/api.js'

function Login() {
  const [form, setForm] = useState({ email: '', senha: '' })
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setEnviando(true)

    try {
      const response = await api.login({ email: form.email, password: form.senha })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('UserId', response.data.UserId)
      navigate('/')
    } catch (error) {
      console.log(error)
      if (error.response?.status === 401) {
        setErro('Email ou senha incorretos.')
      } else {
        setErro('Não foi possível entrar agora. Tente novamente em alguns instantes.')
      }
    } finally {
      setEnviando(false)
    }
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
      {erro && <p className="comentarios-status comentarios-erro">{erro}</p>}
      <FormAcoes>
        <span className="btn-wrapper">
          <button type="submit" className="btn linha-form" disabled={!isFormValid || enviando}>
            {enviando ? 'Entrando...' : 'Entrar'}
          </button>
        </span>
      </FormAcoes>
    </FormPagina>
  )
}

export default Login
