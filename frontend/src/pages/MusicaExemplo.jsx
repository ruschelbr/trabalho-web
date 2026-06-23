import { useEffect, useState } from 'react'
import api from '../api/api.js'

// Música mostrada nesta página. Por enquanto é fixa (a página ainda não recebe
// o id da música pela rota) -- quando a Discografia passar a linkar pra músicas
// dinâmicas, isso deve virar um useParams().
const SONG_ID = 1

// Comentário de exemplo, usado só enquanto o backend/banco não responde
// (ex: seu amigo ainda não terminou o banco). Foto e nome de verdade, tirados
// dos membros da banda, só pra página não ficar feia/vazia nesse meio tempo.
const COMENTARIO_EXEMPLO = {
  id: 'exemplo',
  text: 'Esse riff de abertura é insano, ouço essa faixa todo dia! 🎸',
  User: { name: 'Lincoln Fabrício', profilePicture: '/Lincoln.png' },
}

function MusicaExemplo() {
  const [comentarios, setComentarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erroBusca, setErroBusca] = useState(null)

  const [texto, setTexto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState(null)

  useEffect(() => {
    let ativo = true // evita atualizar o estado se o componente já desmontou

    async function carregarComentarios() {
      setCarregando(true)
      setErroBusca(null)

      try {
        const response = await api.getSongComments(SONG_ID)
        if (!ativo) return
        setComentarios(response.data)
      } catch (error) {
        console.log(error)
        if (!ativo) return
        // Backend fora do ar ou banco ainda não criado: mostra um exemplo
        // pra não ficar tudo vazio, e avisa discretamente o que aconteceu
        setComentarios([COMENTARIO_EXEMPLO])
        setErroBusca('Ainda não foi possível conectar ao banco de dados. Mostrando um comentário de exemplo por enquanto.')
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarComentarios()
    return () => {
      ativo = false
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!texto.trim()) return

    setErroEnvio(null)

    const token = localStorage.getItem('token')
    if (!token) {
      setErroEnvio('Você precisa estar logado para comentar.')
      return
    }

    setEnviando(true)
    try {
      const response = await api.createComment({ text: texto, SongId: SONG_ID }, token)
      setComentarios((atuais) => [response.data, ...atuais.filter((c) => c.id !== 'exemplo')])
      setTexto('')
    } catch (error) {
      console.log(error)
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        setErroEnvio('Sua sessão expirou. Faça login novamente para comentar.')
      } else {
        setErroEnvio('Não foi possível enviar o comentário agora. Tente novamente em alguns instantes.')
      }
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="pagina-musica google-sans">
      <section className="musica-container">
        <div className="musica-topo">
          <div className="musica-album">
            <img src="/Albun1.png" alt="Welcome to the Magic Room" className="musica-capa" />
            <p className="musica-album-nome">Welcome to the Magic Room</p>
          </div>

          <div className="musica-detalhes">
            <h1 className="musica-titulo">X-Ray Riff Machine</h1>
            <div className="musica-video-placeholder">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/ycYCbpjG6A8?si=M_lL2nJxH6-oWNUu"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <section className="musica-comentarios">
          <h2 className="comentarios-titulo">Comentários da música</h2>

          {carregando && <p className="comentarios-status">Carregando comentários...</p>}

          {!carregando && erroBusca && <p className="comentarios-status comentarios-erro">{erroBusca}</p>}

          {!carregando && comentarios.length === 0 && (
            <p className="comentarios-status">Seja o primeiro a comentar essa música!</p>
          )}

          {!carregando &&
            comentarios.map((c) => (
              <div key={c.id} className="comentario-card">
                <div className="comentario-topo">
                  <img
                    src={c.User?.profilePicture || '/logo.jpg'}
                    alt={c.User?.name || 'Usuário'}
                    className="comentario-foto"
                  />
                  <span className="comentario-nome">{c.User?.name || 'Usuário'}</span>
                </div>
                <p className="comentario-texto">{c.text}</p>
              </div>
            ))}
        </section>

        <section className="musica-novo-comentario">
          <h2 className="comentarios-titulo">Deixe o seu comentário também!</h2>
          <form className="form-comentario" onSubmit={handleSubmit}>
            <textarea
              name="comentario"
              id="comentario"
              className="form-comentario-textarea"
              placeholder="Digite aqui o seu comentário..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              required
            />
            {erroEnvio && <p className="comentarios-status comentarios-erro mt-2">{erroEnvio}</p>}
            <button type="submit" className="btn btn-comentario mt-3" disabled={enviando}>
              {enviando ? 'Enviando...' : 'Comentar'}
            </button>
          </form>
        </section>
      </section>
    </main>
  )
}

export default MusicaExemplo
