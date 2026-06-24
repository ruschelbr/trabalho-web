import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../api/api.js"

function Faixa({ faixa, tracklistClasse }) {
  return (
    <li>
      <Link
        to={`/musica/${faixa.id}/${encodeURIComponent(faixa.name)}`}
        className={tracklistClasse}
      >
        {faixa.name}
      </Link>
    </li>
  )
}

function Capa({ src, alt }) {
  return (
    <div className="album-capa-wrap">
      <img src={api.resolveImageUrl(src)} alt={alt} className="capa-img" />
    </div>
  )
}

function InfoAlbum({ album, tracklistClasse, tituloClasse }) {
  return (
    <div className="album-info">
      <h2 className={`album-titulo ${tituloClasse}`}>{album.name}</h2>
      <ol className={`album-tracklist ${tracklistClasse}`}>
        {album.faixas.map((faixa) => (
          <Faixa
            key={faixa.id}
            faixa={faixa}
            tracklistClasse={tracklistClasse}
          />
        ))}
      </ol>
    </div>
  )
}

function BotoesAdmin({ album, onDeletar }) {
  const navigate = useNavigate()

  return (
    <div className="album-admin-btns">
      <button
        className="album-admin-btn album-admin-btn--editar"
        title="Editar álbum"
        onClick={() =>
          navigate("/cadastrar-album", { state: { album } })
        }
      >
        ✏️
      </button>
      <button
        className="album-admin-btn album-admin-btn--apagar"
        title="Apagar álbum"
        onClick={() => onDeletar(album)}
      >
        🗑️
      </button>
    </div>
  )
}

function ModalConfirmar({ album, onConfirmar, onCancelar }) {
  return (
    <div className="modal-overlay">
      <div className="modal-caixa inter">
        <p>
          Tem certeza que deseja apagar o álbum <strong>{album.name}</strong>?
          <br />
          <span style={{ fontSize: "0.85rem", opacity: 0.7 }}>
            Essa ação não pode ser desfeita.
          </span>
        </p>
        <div className="modal-botoes">
          <button type="button" className="btn-modal-sim" onClick={onConfirmar}>
            APAGAR
          </button>
          <button type="button" className="btn-modal-nao" onClick={onCancelar}>
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  )
}

function BlocoAlbum({ album, index, isAdmin, onDeletar }) {
  const isClaro = index % 2 === 0

  const bloco = isClaro ? "bloco-claro" : "bloco-escuro"
  const linha = isClaro ? "linha-azul" : "linha-amarela"
  const tituloClasse = isClaro ? "titulo-azul" : "titulo-amarelo"
  const tracklistClasse = isClaro ? "tracklist-escuro" : "tracklist-claro"
  const capaPrimeiro = isClaro

  return (
    <div className={`bloco-album ${bloco}`}>
      <div className={`linha-lateral ${linha}`} />

      {isAdmin && (
        <BotoesAdmin album={album} onDeletar={onDeletar} />
      )}

      {capaPrimeiro ? (
        <>
          <Capa src={album.cover} alt={album.name} />
          <InfoAlbum
            album={album}
            tituloClasse={tituloClasse}
            tracklistClasse={tracklistClasse}
          />
        </>
      ) : (
        <>
          <InfoAlbum
            album={album}
            tituloClasse={tituloClasse}
            tracklistClasse={tracklistClasse}
          />
          <Capa src={album.cover} alt={album.name} />
        </>
      )}
    </div>
  )
}

function Discografia() {
  const [albuns, setAlbuns] = useState([])
  const [albumParaDeletar, setAlbumParaDeletar] = useState(null)
  const [deletando, setDeletando] = useState(false)

  const isAdmin = localStorage.getItem("admin") === "true"

  useEffect(() => {
    async function carregarDados() {
      try {
        const { data: albumsData } = await api.getAlbums()
        console.log("álbuns:", albumsData)

        const albumsComFaixas = await Promise.all(
          albumsData.map(async (album) => {
            const { data: songs } = await api.getSongsOfAlbum(album.id)
            console.log(`músicas do álbum ${album.id}:`, songs)
            return { ...album, faixas: songs }
          }),
        )

        setAlbuns(albumsComFaixas)
      } catch (error) {
        console.error("erro ao carregar dados:", error)
      }
    }

    carregarDados()
  }, [])

  async function confirmarDelecao() {
    if (!albumParaDeletar) return
    setDeletando(true)
    try {
      await api.deleteAlbum(albumParaDeletar.id)
      setAlbuns((atual) => atual.filter((a) => a.id !== albumParaDeletar.id))
      setAlbumParaDeletar(null)
    } catch (error) {
      console.error("erro ao deletar álbum:", error)
    } finally {
      setDeletando(false)
    }
  }

  return (
    <>
      {albuns.map((album, index) => (
        <BlocoAlbum
          key={album.id}
          album={album}
          index={index}
          isAdmin={isAdmin}
          onDeletar={setAlbumParaDeletar}
        />
      ))}

      {albumParaDeletar && (
        <ModalConfirmar
          album={albumParaDeletar}
          onConfirmar={confirmarDelecao}
          onCancelar={() => setAlbumParaDeletar(null)}
        />
      )}

      {deletando && (
        <div className="modal-overlay">
          <div className="modal-caixa inter">
            <p>Apagando álbum...</p>
          </div>
        </div>
      )}
    </>
  )
}

export default Discografia
