import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormPagina, FormAcoes } from '../components/FormPagina.jsx'
import api from '../api/api.js'

function Perfil() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [confirmarSaida, setConfirmarSaida] = useState(false)

  const isAdmin = localStorage.getItem('admin') === 'true'

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
    return () => { ativo = false }
  }, [navigate])

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/editar-perfil')
  }

  function handleSair() {
    localStorage.removeItem('token')
    localStorage.removeItem('UserId')
    localStorage.removeItem('admin')
    navigate('/')
    window.scrollTo(0, 0)
  }

  return (
    <FormPagina onSubmit={handleSubmit}>

      <div className="perfil-banner">
        <div className="perfil-foto-wrapper">
          <img
            src={api.resolveImageUrl(usuario?.profilePicture)}
            alt="foto de perfil"
            className="perfil-foto"
          />
        </div>
      </div>

      <div className="perfil-corpo inter">
        {carregando && <p className="comentarios-status">Carregando perfil...</p>}
        {!carregando && erro && <p className="comentarios-status comentarios-erro">{erro}</p>}

        {!carregando && usuario && (
          <>
            <p className="perfil-nome google-sans">{usuario.name}</p>
            {isAdmin && <span className="perfil-badge-admin">Admin</span>}

            <div className="perfil-info-grid">
              <div className="perfil-info-item">
                <span className="perfil-info-label">Email</span>
                <span className="perfil-info-valor">{usuario.email}</span>
              </div>
              <div className="perfil-info-item">
                <span className="perfil-info-label">Álbum favorito</span>
                <span className="perfil-info-valor">{usuario.albumFavorito}</span>
              </div>
            </div>
          </>
        )}
      </div>

      <FormAcoes>
        <div style={{ flex: 1 }}>
          <button type="button" className="btn-sair" onClick={() => setConfirmarSaida(true)}>
            Sair
          </button>
        </div>
        <button type="submit" className="btn linha-form" disabled={carregando || !usuario}>
          Editar
        </button>
        <div style={{ flex: 1 }} />
      </FormAcoes>

      {confirmarSaida && (
        <div className="modal-overlay">
          <div className="modal-caixa inter">
            <p>Tem certeza que deseja sair?</p>
            <div className="modal-botoes">
              <button type="button" className="btn-modal-sim" onClick={handleSair}>SIM</button>
              <button type="button" className="btn-modal-nao" onClick={() => setConfirmarSaida(false)}>NÃO</button>
            </div>
          </div>
        </div>
      )}
    </FormPagina>
  )
}

export default Perfil
