import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormPagina, FormAcoes } from '../components/FormPagina.jsx'
import api from '../api/api.js'

function Perfil() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem('UserId')
    if (!userId) {
      navigate('/login')
      return
    }

    let ativo = true

    async function carregarPerfil() {
      setCarregando(true)
      setErro(null)

      try {
        const response = await api.getUser(userId)
        if (!ativo) return

        const dados = response.data
        let albumFavorito = 'Não definido'

        if (dados.favoriteAlbumId) {
          const albunsRes = await api.getAlbums()
          if (!ativo) return
          const album = albunsRes.data.find((a) => a.id === dados.favoriteAlbumId)
          if (album) albumFavorito = album.name
        }

        setUsuario({ ...dados, albumFavorito })
      } catch (error) {
        console.log(error)
        if (!ativo) return
        setErro('Não foi possível carregar seu perfil. Tente fazer login novamente.')
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarPerfil()
    return () => {
      ativo = false
    }
  }, [navigate])

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/editar-perfil')
  }

  return (
    <FormPagina onSubmit={handleSubmit}>
      <div id="perfil" className="form-perfil">
        {carregando && <p className="comentarios-status">Carregando perfil...</p>}

        {!carregando && erro && (
          <p className="comentarios-status comentarios-erro">{erro}</p>
        )}

        {!carregando && usuario && (
          <>
            <div className="form-campo">
              <img
                src={usuario.profilePicture || '/logo.jpg'}
                alt="foto-perfil"
                className="img-perfil"
              />
            </div>
            <div className="form-campo-dados">
              <p className="texto-escuro fw-bold">Nome:</p>
              <p className="texto-escuro">{usuario.name}</p>
            </div>
            <div className="form-campo-dados">
              <p className="texto-escuro fw-bold">Álbum favorito:</p>
              <p className="texto-escuro">{usuario.albumFavorito}</p>
            </div>
            <div className="form-campo-dados">
              <p className="texto-escuro fw-bold">Email:</p>
              <p className="texto-escuro">{usuario.email}</p>
            </div>
          </>
        )}
      </div>
      <FormAcoes>
        <button type="submit" className="btn linha-form" disabled={carregando || !usuario}>
          Editar
        </button>
      </FormAcoes>
    </FormPagina>
  )
}

export default Perfil
