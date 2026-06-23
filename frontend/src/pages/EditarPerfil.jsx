import { useNavigate } from 'react-router-dom'
import { FormPagina, FormTitulo, FormCampo, FormAcoes, FormUpload } from '../components/FormPagina.jsx'

function EditarPerfil() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo>Editar</FormTitulo>
      <FormCampo label="Nome:">
        <input
          type="text"
          name="nome"
          id="nome-perfil"
          className="form-input linha-form"
        />
      </FormCampo>
      <FormCampo label="Senha:">
        <input
          type="password"
          name="senha"
          id="senha-perfil"
          className="form-input linha-form"
        />
      </FormCampo>
      <FormCampo label="Álbum favorito:">
        <select name="album" id="album-perfil" className="dropdown-form linha-form">
          <option value="sunset">Splippleman at Sunset Sound... Lost, Now Found</option>
          <option value="night">Still Night Blue</option>
          <option value="magic">Welcome to the Magic Room</option>
        </select>
      </FormCampo>
      <FormUpload id="perfil-foto" name="perfil" label="Foto de perfil:" />
      <FormAcoes>
        <div style={{ flex: 1 }}>
          <button type="button" className="btn-voltar" onClick={() => navigate('/perfil')}>
            Voltar
          </button>
        </div>
        <button type="submit" className="btn linha-form">
          Editar
        </button>
        <div style={{ flex: 1 }} />
      </FormAcoes>
    </FormPagina>
  )
}

export default EditarPerfil
