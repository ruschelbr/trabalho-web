import { useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FormPagina, FormTitulo, FormAcoes } from '../components/FormPagina.jsx'
import api from '../api/api.js'

function AdicionarMusicas() {
  const navigate = useNavigate()
  const location = useLocation()
  const { albumId, albumNome } = location.state || {}

  const proximoId = useRef(2)
  const [musicas, setMusicas] = useState([{ id: 1, nome: '', link: '' }])
  const [novasIds, setNovasIds] = useState(() => new Set())
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)

  function adicionarMusica() {
    const id = proximoId.current++
    setMusicas((prev) => [...prev, { id, nome: '', link: '' }])
    setNovasIds((prev) => new Set(prev).add(id))
  }

  function removerMusica(id) {
    setMusicas((prev) => prev.filter((m) => m.id !== id))
  }

  function atualizarMusica(id, campo, valor) {
    setMusicas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [campo]: valor } : m)),
    )
  }

  function handleAnimationEnd(id) {
    setNovasIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setFeedback(null)
    try {
      await Promise.all(
        musicas.map((musica, index) =>
          api.createSong({
            name: musica.nome,
            youtubeLink: musica.link,
            tracklistPosition: index + 1,
            AlbumId: albumId,
          }),
        ),
      )
      navigate('/')
    } catch (error) {
      console.log(error)
      setFeedback('Erro ao adicionar músicas. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = musicas.every((m) => m.nome.trim() !== '' && m.link.trim() !== '')

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo
        subtitulo={
          <p className="texto-escuro form-subtitulo">
            Álbum: <span>{albumNome || '—'}</span>
          </p>
        }
      >
        Adicionar Músicas
      </FormTitulo>

      <div id="lista-musicas" className="row px-5">
        {musicas.map((musica, index) => {
          const numero = index + 1
          const classeItem = ['musica-item', 'py-3', novasIds.has(musica.id) ? 'nova' : '']
            .filter(Boolean)
            .join(' ')

          return (
            <div
              key={musica.id}
              className={classeItem}
              onAnimationEnd={() => handleAnimationEnd(musica.id)}
            >
              <div className="musica-cabecalho">
                <p className="musica-numero mb-0">Música {numero}</p>
                {numero > 1 && (
                  <button
                    type="button"
                    className="btn-remover"
                    title="Remover música"
                    onClick={() => removerMusica(musica.id)}
                  >
                    ×
                  </button>
                )}
              </div>
              <label htmlFor={`nome-${musica.id}`} className="my-2 texto-escuro">
                Nome:
              </label>
              <input
                type="text"
                name="nome[]"
                id={`nome-${musica.id}`}
                value={musica.nome}
                onChange={(e) => atualizarMusica(musica.id, 'nome', e.target.value)}
                className="form-input linha-form mb-3"
              />
              <label htmlFor={`link-${musica.id}`} className="my-2 texto-escuro">
                Link do YouTube:
              </label>
              <input
                type="text"
                name="link[]"
                id={`link-${musica.id}`}
                value={musica.link}
                onChange={(e) => atualizarMusica(musica.id, 'link', e.target.value)}
                className="form-input linha-form"
              />
            </div>
          )
        })}
      </div>

      <div className="row px-5 mt-1">
        <button type="button" className="btn-adicionar inter" onClick={adicionarMusica}>
          <span className="icone-mais">+</span>
          Adicionar música
        </button>
      </div>

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
            {loading ? 'Publicando...' : 'Publicar Álbum'}
          </button>
        </span>
      </FormAcoes>
    </FormPagina>
  )
}

export default AdicionarMusicas
