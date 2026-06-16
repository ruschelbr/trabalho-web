import { Link } from 'react-router-dom'
import { FormPagina, FormTitulo, FormCampo, FormAcoes } from '../components/FormPagina.jsx'

function Login() {
  function handleSubmit(e) {
    e.preventDefault()
  }

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
      <FormCampo label="Email:" htmlFor="email-login">
        <input type="email" name="email" id="email-login" className="form-input linha-form" />
      </FormCampo>
      <FormCampo label="Senha:" htmlFor="senha-login">
        <input type="password" name="senha" id="senha-login" className="form-input linha-form" />
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
        <button type="submit" className="btn linha-form">
          Entrar
        </button>
      </FormAcoes>
    </FormPagina>
  )
}

export default Login
