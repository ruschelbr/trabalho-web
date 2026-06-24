import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../api/api.js"
// import '../../css/discografia.css'

function Faixa({ faixa, tracklistClasse }) {
  return (
    <li>
      <Link
        to={`/musica/${encodeURIComponent(faixa.name)}`}
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
      <img src={src} alt={alt} className="capa-img" />
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

function BlocoAlbum({ album, index }) {
  const isClaro = index % 2 === 0

  const bloco = isClaro ? "bloco-claro" : "bloco-escuro"
  const linha = isClaro ? "linha-azul" : "linha-amarela"
  const tituloClasse = isClaro ? "titulo-azul" : "titulo-amarelo"
  const tracklistClasse = isClaro ? "tracklist-escuro" : "tracklist-claro"
  const capaPrimeiro = isClaro

  return (
    <div className={`bloco-album ${bloco}`}>
      <div className={`linha-lateral ${linha}`} />
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

  return (
    <>
      {albuns.map((album, index) => (
        <BlocoAlbum key={album.id} album={album} index={index} />
      ))}
    </>
  )
}

export default Discografia
