import { useNavigate } from 'react-router-dom'
import { FormPagina, FormAcoes } from '../components/FormPagina.jsx'

function Perfil() {
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/editar-perfil')
  }

  return (
    <FormPagina onSubmit={handleSubmit}>
      <div id="perfil" className="form-perfil">
        <div className="form-campo">
          <img src="/logo.jpg" alt="foto-perfil" className="img-perfil" />
        </div>
        <div className="form-campo-dados">
          <p className="texto-escuro fw-bold">Nome:</p>
          <p className="texto-escuro">Nome exemplo</p>
        </div>
        <div className="form-campo-dados">
          <p className="texto-escuro fw-bold">Álbum favorito:</p>
          <p className="texto-escuro">Lost, Now Found</p>
        </div>
        <div className="form-campo-dados">
          <p className="texto-escuro fw-bold">Email:</p>
          <p className="texto-escuro">email@email.com</p>
        </div>
      </div>
      <FormAcoes>
        <button type="submit" className="btn linha-form">
          Editar
        </button>
      </FormAcoes>
    </FormPagina>
  )
}

export default Perfil
