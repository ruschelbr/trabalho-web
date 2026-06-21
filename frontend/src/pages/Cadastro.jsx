import { FormPagina, FormTitulo, FormCampo, FormAcoes, FormUpload } from '../components/FormPagina.jsx'

function Cadastro() {
  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo>Cadastro</FormTitulo>
      <FormCampo label="Nome:" htmlFor="nome-cadastro">
        <input type="text" name="nome" id="nome-cadastro" className="form-input linha-form" />
      </FormCampo>
      <FormCampo label="Email:" htmlFor="email-cadastro">
        <input type="email" name="email" id="email-cadastro" className="form-input linha-form" />
      </FormCampo>
      <FormCampo label="Senha:" htmlFor="senha-cadastro">
        <input type="password" name="senha" id="senha-cadastro" className="form-input linha-form" />
      </FormCampo>
      <FormCampo label="Álbum favorito:" htmlFor="album-cadastro">
        <select name="album" id="album-cadastro" className="dropdown-form linha-form">
          <option value="sunset">Splippleman at Sunset Sound... Lost, Now Found</option>
          <option value="night">Still Night Blue</option>
          <option value="magic">Welcome to the Magic Room</option>
        </select>
      </FormCampo>
      <FormUpload id="perfil-cadastro" name="perfil" label="Foto de perfil:" />
      <FormAcoes>
        <button type="submit" className="btn linha-form texto-escuro">
          Cadastrar
        </button>
      </FormAcoes>
    </FormPagina>
  )
}

export default Cadastro
