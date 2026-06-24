import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FormPagina, FormTitulo, FormCampo, FormAcoes, FormUpload } from '../components/FormPagina.jsx'
import api from '../api/api.js'

function CadastrarAlbum() {
  const navigate = useNavigate()
  const location = useLocation()

  // Se vier com state.album, estamos no modo edição
  const albumEditando = location.state?.album ?? null
  const modoEdicao = albumEditando !== null

  const [form, setForm] = useState({
    nome: albumEditando?.name ?? '',
    data: albumEditando?.release ?? '',
    tipo: albumEditando?.type ?? '',
  })
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
      // Faz upload da nova capa, se o usuário escolheu uma
      let coverPath = modoEdicao ? (albumEditando.cover ?? null) : null
      if (capa) {
        const formData = new FormData()
        formData.append('image', capa)
        const uploadResult = await api.uploadImage(formData)
        coverPath = uploadResult.data.path
      }

      const payload = {
        name: form.nome,
        release: form.data,
        type: form.tipo,
        cover: coverPath,
      }

      if (modoEdicao) {
        await api.updateAlbum(albumEditando.id, payload)
        navigate('/discografia')
      } else {
        const albumResult = await api.createAlbum(payload)
        navigate('/adicionar-musicas', {
          state: { albumId: albumResult.data.id, albumNome: form.nome },
        })
      }
    } catch (error) {
      console.log(error)
      setFeedback(
        modoEdicao
          ? 'Erro ao atualizar álbum. Tente novamente.'
          : 'Erro ao cadastrar álbum. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
    form.nome.trim() !== '' && form.data.trim() !== '' && form.tipo !== ''

  // Preview da capa: nova imagem escolhida tem prioridade, senão mostra a atual
  const previewCapa = capa
    ? URL.createObjectURL(capa)
    : api.resolveImageUrl(albumEditando?.cover ?? null)

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo>{modoEdicao ? 'Editar Álbum' : 'Cadastrar Álbum'}</FormTitulo>

      {/* Preview da capa atual no modo edição */}
      {modoEdicao && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 1.5rem 0.5rem' }}>
          <img
            src={previewCapa}
            alt="Capa atual"
            style={{
              width: 120,
              height: 120,
              objectFit: 'cover',
              borderRadius: 8,
              border: '2px solid rgba(255,255,255,0.15)',
            }}
          />
        </div>
      )}

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

      <FormCampo label="Ano de Lançamento:">
        <input
          type="text"
          name="data"
          id="data-album"
          className="form-input linha-form"
          value={form.data}
          maxLength={4}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 4)
            setForm({ ...form, data: val })
          }}
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
        label={modoEdicao ? 'Nova Capa (opcional):' : 'Capa do Álbum:'}
        onChange={(e) => setCapa(e.target.files[0] || null)}
      />

      {feedback && (
        <p style={{ textAlign: 'center', color: '#c0392b', padding: '0 1.5rem' }}>
          {feedback}
        </p>
      )}

      <FormAcoes>
        <span className="btn-wrapper">
          <button
            type="button"
            className="btn linha-form"
            style={{ opacity: 0.6 }}
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </span>
        <span className="btn-wrapper">
          <button
            type="submit"
            className="btn linha-form"
            disabled={!isFormValid || loading}
          >
            {loading
              ? modoEdicao ? 'Salvando...' : 'Criando...'
              : modoEdicao ? 'Salvar Alterações' : 'Criar Álbum'}
          </button>
        </span>
      </FormAcoes>
    </FormPagina>
  )
}

export default CadastrarAlbum
