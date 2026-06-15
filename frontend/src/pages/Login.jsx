import { Link } from 'react-router-dom'

function Login() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <form id="caixa-branca" method="post" className="inter" onSubmit={handleSubmit}>
      <div id="login" className="container d-flex flex-column align-items-center justify-content-center">
        <div className="row py-0 px-5 google-sans">
          <p className="my-3 nome-formulario texto-escuro">Login</p>
        </div>
        <div className="row py-4 px-5">
          <label htmlFor="email-login" className="my-3 texto-escuro">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email-login"
            className="form-input linha-form"
          />
        </div>
        <div className="row py-4 px-5">
          <label htmlFor="senha-login" className="my-3 texto-escuro">
            Senha:
          </label>
          <input
            type="password"
            name="senha"
            id="senha-login"
            className="form-input linha-form"
          />
        </div>
        <div className="row py-4 px-5">
          <div className="col d-flex align-items-center gap-2">
            <input
              type="checkbox"
              name="lembrar"
              id="lembrar"
              className="checkbox linha-form"
            />
            <label htmlFor="lembrar" className="texto-escuro">
              Lembrar-me
            </label>
          </div>
        </div>
        <div className="row py-4 px-5">
          <button type="submit" className="btn mx-auto linha-form">
            Entrar
          </button>
        </div>
      </div>

      <div className="py-4 px-5 registrar d-flex justify-content-center">
        <div>
          <label className="texto-claro">Não tem uma conta?</label>
          <Link to="/cadastro" className="links-animacao link-registrar mx-4">
            Registre-se
          </Link>
        </div>
      </div>
    </form>
  )
}

export default Login
