import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormPagina, FormTitulo, FormCampo, FormAcoes, FormUpload } from '../components/FormPagina.jsx'
import api from '../api/api.js'

function CadastrarAlbum() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', data: '', tipo: '' })
  const [capa, setCapa] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)
    try {
      let coverPath = ''
      if (capa) {
        const formData = new FormData()
        formData.append('image', capa)
        const uploadResult = await api.uploadImage(formData)
        coverPath = uploadResult.data.path
      }

      const albumResult = await api.createAlbum({
        name: form.nome,
        release: form.data,
        type: form.tipo,
        cover: coverPath,
      })

      navigate('/adicionar-musicas', {
        state: { albumId: albumResult.data.id, albumNome: form.nome },
      })
    } catch (error) {
      console.log(error)
      setFeedback('Erro ao cadastrar álbum. Tente novamente.')
    } finally {
      setLoading(false)
    }
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
      <FormUpload
        id="capa-album"
        name="capa"
        label="Capa do Álbum:"
        onChange={(e) => setCapa(e.target.files[0] || null)}
      />
      {feedback && (
        <p style={{ textAlign: 'center', color: '#c0392b', padding: '0 1.5rem' }}>{feedback}</p>
      )}
      <FormAcoes>
        <span className="btn-wrapper">
          <button
            type="submit"
            className="btn linha-form"
            disabled={!isFormValid || loading}
          >
            {loading ? 'Criando...' : 'Criar Álbum'}
          </button>
        </span>
      </FormAcoes>
    </FormPagina>
  )
}

export default CadastrarAlbum
