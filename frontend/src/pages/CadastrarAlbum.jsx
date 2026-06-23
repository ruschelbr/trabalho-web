import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormPagina, FormTitulo, FormCampo, FormAcoes, FormUpload } from '../components/FormPagina.jsx'

function CadastrarAlbum() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', data: '', tipo: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/adicionar-musicas')
  }

  const isFormValid = form.nome.trim() !== '' && form.data.trim() !== '' && form.tipo !== ''

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo>Cadastrar Álbum</FormTitulo>
      <FormCampo label="Nome:">
        <input
          type="text"
          name="nome"
          id="nome-album"
          className="form-input linha-form"
          value={form.nome}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Data de Lançamento:">
        <input
          type="text"
          name="data"
          id="data-album"
          placeholder="DD/MM/YYYY"
          className="form-input linha-form"
          value={form.data}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Tipo:">
        <select
          name="tipo"
          id="tipo-album"
          className="dropdown-form linha-form"
          value={form.tipo}
          onChange={handleChange}
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
        <span className="btn-wrapper">
          <button type="submit" className="btn linha-form" disabled={!isFormValid}>
            Criar Álbum
          </button>
        </span>
      </FormAcoes>
    </FormPagina>
  )
}

export default CadastrarAlbum
