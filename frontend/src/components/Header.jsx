import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { isLoggedIn, logout } from '../auth.js'

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [logado, setLogado] = useState(() => isLoggedIn())

  useEffect(() => {
    setLogado(isLoggedIn())
  }, [location])

  function handleLogout() {
    logout()
    setLogado(false)
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `mx-xs-1 mx-sm-3 mx-lg-5 texto-claro links-animacao links-header${isActive ? ' active' : ''}`

  const loginLinkClass = ({ isActive }) =>
    `ms-auto me-xs-1 me-sm-3 me-lg-5 texto-claro links-animacao links-header${isActive ? ' active' : ''}`

  return (
    <header className="header py-4 px-5 w-100 d-flex align-items-center inter">
      <NavLink to="/" className="me-xs-1 me-se-3 me-lg-5">
        <img src="/logo.jpg" alt="Splippleman" />
      </NavLink>
      <NavLink to="/discografia" className={linkClass}>
        Discografia
      </NavLink>
      <NavLink to="/sobre" className={linkClass}>
        Sobre
      </NavLink>
      <NavLink to="/contato" className={linkClass}>
        Contato
      </NavLink>
      <NavLink to="/cadastrar-album" className={linkClass}>
        Cadastrar álbum
      </NavLink>
      {logado ? (
        <div className="ms-auto d-flex align-items-center">
          <NavLink to="/perfil" className={linkClass}>
            Perfil
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="mx-xs-1 mx-sm-3 mx-lg-5 texto-claro links-animacao links-header border-0 bg-transparent"
          >
            Sair
          </button>
        </div>
      ) : (
        <NavLink to="/login" className={loginLinkClass}>
          Login
        </NavLink>
      )}
    </header>
  )
}

export default Header
