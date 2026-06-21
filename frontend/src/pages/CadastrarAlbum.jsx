import { useNavigate } from 'react-router-dom'
import { FormPagina, FormTitulo, FormCampo, FormAcoes, FormUpload } from '../components/FormPagina.jsx'

function CadastrarAlbum() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/adicionar-musicas')
  }

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo>Cadastrar Álbum</FormTitulo>
      <FormCampo label="Nome:" htmlFor="nome-album">
        <input type="text" name="nome" id="nome-album" className="form-input linha-form" />
      </FormCampo>
      <FormCampo label="Data de Lançamento:" htmlFor="data-album">
        <input
          type="text"
          name="data"
          id="data-album"
          placeholder="DD/MM/YYYY"
          className="form-input linha-form"
        />
      </FormCampo>
      <FormCampo label="Tipo:" htmlFor="tipo-album">
        <select
          name="tipo"
          id="tipo-album"
          className="dropdown-form linha-form"
          defaultValue=""
        >
          <option value="" disabled hidden>
            ex: Álbum, Single, EP, Ao vivo
          </option>
          <option value="album">Álbum</option>
          <option value="single">Single</option>
          <option value="ep">EP</option>
          <option value="ao-vivo">Ao vivo</option>
          <option value="outro">Outro</option>
        </select>
      </FormCampo>
      <FormUpload id="capa-album" name="capa" label="Capa do Álbum:" />
      <FormAcoes>
        <button type="submit" className="btn linha-form">
          Criar Álbum
        </button>
      </FormAcoes>
    </FormPagina>
  )
}

export default CadastrarAlbum
