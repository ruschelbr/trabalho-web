import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api/api.js"

const COMENTARIO_EXEMPLO = {
  id: "exemplo",
  text: "Esse riff de abertura é insano, ouço essa faixa todo dia! 🎸",
  User: { name: "Lincoln Fabrício", profilePicture: "/Lincoln.png" },
}

function sortComentarios(lista) {
  return [...lista].sort((a, b) => {
    if (a.pinnedAt && b.pinnedAt) return new Date(a.pinnedAt) - new Date(b.pinnedAt)
    if (a.pinnedAt) return -1
    if (b.pinnedAt) return 1
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
}

function MusicaExemplo() {
  const { id } = useParams()

  const isAdmin = localStorage.getItem("admin") === "true"
  const token = localStorage.getItem("token")

  const [musica, setMusica] = useState(null)
  const [comentarios, setComentarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erroBusca, setErroBusca] = useState(null)

  const [texto, setTexto] = useState("")
  const [enviando, setEnviando] = useState(false)
  const [erroEnvio, setErroEnvio] = useState(null)
  const [comentarioParaDeletar, setComentarioParaDeletar] = useState(null)
  const [erroPin, setErroPin] = useState(null)

  useEffect(() => {
    let ativo = true

    async function carregarDados() {
      setCarregando(true)
      setErroBusca(null)

      try {
        const { data: songData } = await api.getSongById(id)
        if (!ativo) return
        setMusica(songData)

        const response = await api.getSongComments(songData.id)
        if (!ativo) return
        setComentarios(response.data)
      } catch (error) {
        console.log(error)
        if (!ativo) return
        setComentarios([COMENTARIO_EXEMPLO])
        setErroBusca(
          "Ainda não foi possível conectar ao banco de dados. Mostrando um comentário de exemplo por enquanto.",
        )
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarDados()
    return () => {
      ativo = false
    }
  }, [id])

  function getEmbedUrl(url) {
    if (!url) return null
    const id = new URL(url).searchParams.get("v")
    return `https://www.youtube.com/embed/${id}`
  }
  async function confirmarDelete() {
    try {
      await api.deleteComment(comentarioParaDeletar, token)
      setComentarios((atuais) => atuais.filter((c) => c.id !== comentarioParaDeletar))
    } catch (error) {
      console.log(error)
    } finally {
      setComentarioParaDeletar(null)
    }
  }

  async function handlePin(commentId, pinnedAt) {
    setErroPin(null)
    try {
      const res = await api.pinComment(commentId, token)
      setComentarios((atuais) =>
        sortComentarios(
          atuais.map((c) =>
            c.id === commentId ? { ...c, pinnedAt: res.data.pinnedAt } : c,
          ),
        ),
      )
    } catch (error) {
      console.log(error)
      const msg = error.response?.data?.message || "Erro ao fixar comentário."
      setErroPin(`[${error.response?.status}] ${msg}`)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!texto.trim()) return

    setErroEnvio(null)

    const token = localStorage.getItem("token")
    if (!token) {
      setErroEnvio("Você precisa estar logado para comentar.")
      return
    }

    setEnviando(true)
    try {
      const response = await api.createComment(
        { text: texto, SongId: musica.id },
        token,
      )
      setComentarios((atuais) => [
        response.data,
        ...atuais.filter((c) => c.id !== "exemplo"),
      ])
      setTexto("")
    } catch (error) {
      console.log(error)
      if (error.response?.status === 401) {
        localStorage.removeItem("token")
        setErroEnvio("Sua sessão expirou. Faça login novamente para comentar.")
      } else {
        setErroEnvio(
          "Não foi possível enviar o comentário agora. Tente novamente em alguns instantes.",
        )
      }
    } finally {
      setEnviando(false)
    }
  }

  if (carregando) return <p>Carregando...</p>

  return (
    <main className="pagina-musica google-sans">
      <section className="musica-container">
        <div className="musica-topo">
          <div className="musica-album">
            <img
              src={api.resolveImageUrl(musica?.Album?.cover)}
              alt={musica?.Album?.name}
              className="musica-capa"
            />
            <p className="musica-album-nome">{musica?.Album?.name}</p>
          </div>

          <div className="musica-detalhes">
            <h1 className="musica-titulo">{musica?.name}</h1>
            {musica?.youtubeLink && (
              <div className="musica-video-placeholder">
                <iframe
                  width="560"
                  height="315"
                  src={getEmbedUrl(musica.youtubeLink)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>

        <section className="musica-comentarios">
          <h2 className="comentarios-titulo">Comentários da música</h2>

          {erroBusca && (
            <p className="comentarios-status comentarios-erro">{erroBusca}</p>
          )}
          {erroPin && (
            <p className="comentarios-status comentarios-erro">{erroPin}</p>
          )}

          {comentarios.length === 0 && (
            <p className="comentarios-status">
              Seja o primeiro a comentar essa música!
            </p>
          )}

          {comentarios.map((c) => (
            <div key={c.id} className={`comentario-card${c.pinnedAt ? " comentario-card-fixado" : ""}`}>
              <div className="comentario-topo">
                <img
                  src={api.resolveImageUrl(c.User?.profilePicture)}
                  alt={c.User?.name || "Usuário"}
                  className="comentario-foto"
                />
                <span className="comentario-nome">
                  {c.User?.name || "Usuário"}
                </span>
                {c.pinnedAt && (
                  <span className="comentario-pin-badge" title="Comentário fixado">📌</span>
                )}
                {isAdmin && (
                  <div className="comentario-admin-acoes">
                    <button
                      className={`btn-admin-pin${c.pinnedAt ? " ativo" : ""}`}
                      onClick={() => handlePin(c.id, c.pinnedAt)}
                      title={c.pinnedAt ? "Desafixar" : "Fixar"}
                    >
                      📌
                    </button>
                    <button
                      className="btn-admin-deletar"
                      onClick={() => setComentarioParaDeletar(c.id)}
                      title="Excluir comentário"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
              <p className="comentario-texto">{c.text}</p>
            </div>
          ))}
        </section>

        <section className="musica-novo-comentario">
          <h2 className="comentarios-titulo">Deixe o seu comentário também!</h2>
          <form className="form-comentario" onSubmit={handleSubmit}>
            <textarea
              className="form-comentario-textarea"
              placeholder="Digite aqui o seu comentário..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              required
            />
            {erroEnvio && (
              <p className="comentarios-status comentarios-erro">{erroEnvio}</p>
            )}
            <button
              type="submit"
              className="btn btn-comentario mt-3"
              disabled={enviando}
            >
              {enviando ? "Enviando..." : "Comentar"}
            </button>
          </form>
        </section>
      </section>

      {comentarioParaDeletar && (
        <div className="modal-overlay">
          <div className="modal-caixa inter">
            <p>Deseja remover o comentário?</p>
            <div className="modal-botoes">
              <button type="button" className="btn-modal-sim" onClick={confirmarDelete}>SIM</button>
              <button type="button" className="btn-modal-nao" onClick={() => setComentarioParaDeletar(null)}>NÃO</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default MusicaExemplo
