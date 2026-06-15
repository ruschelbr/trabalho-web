function Cadastro() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <form id="caixa-branca" method="post" className="inter" onSubmit={handleSubmit}>
      <div id="login" className="container d-flex flex-column justify-content-center">
        <div className="row py-0 px-5">
          <p className="my-3 nome-formulario texto-escuro">Cadastro</p>
        </div>
        <div className="row py-4 px-5">
          <label htmlFor="nome-cadastro" className="my-3 texto-escuro">
            Nome:
          </label>
          <input
            type="text"
            name="nome"
            id="nome-cadastro"
            className="form-input linha-form"
          />
        </div>
        <div className="row py-4 px-5">
          <label htmlFor="email-cadastro" className="my-3 texto-escuro">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email-cadastro"
            className="form-input linha-form"
          />
        </div>
        <div className="row py-4 px-5">
          <label htmlFor="senha-cadastro" className="my-3 texto-escuro">
            Senha:
          </label>
          <input
            type="password"
            name="senha"
            id="senha-cadastro"
            className="form-input linha-form"
          />
        </div>
        <div className="row py-4 px-5">
          <label htmlFor="album" className="my-3 texto-escuro">
            Álbum favorito:
          </label>
          <select name="album" id="album" className="dropdown-form linha-form">
            <option value="sunset">Splippleman at Sunset Sound... Lost, Now Found</option>
            <option value="night">Still Night Blue</option>
            <option value="magic">Welcome to the Magic Room</option>
          </select>
        </div>
        <div className="row py-4 px-5">
          <label className="my-3 texto-escuro">Foto de perfil:</label>
          <input type="file" name="perfil" id="perfil" className="form-input linha-form d-none" />
          <label
            htmlFor="perfil"
            className="form-input linha-form text-center py-2"
            style={{ cursor: 'pointer', backgroundColor: '#ECECEC' }}
          >
            Upload
          </label>
        </div>
        <div className="row py-4 px-5">
          <button type="submit" className="btn mx-auto linha-form texto-escuro">
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  )
}

export default Cadastro
