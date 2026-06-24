import { NavLink, useLocation } from 'react-router-dom'

function Header() {
  useLocation()

  const isLoggedIn = !!localStorage.getItem('UserId')
  const isAdmin = localStorage.getItem('admin') === 'true'

  const linkClass = ({ isActive }) =>
    `mx-xs-1 mx-sm-3 mx-lg-5 texto-claro links-animacao links-header${isActive ? ' active' : ''}`

  const linkClassDireita = `ms-auto me-xs-1 me-sm-3 me-lg-5 texto-claro links-animacao links-header`

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
      {isAdmin && (
        <NavLink to="/cadastrar-album" className={linkClass}>
          Cadastrar álbum
        </NavLink>
      )}
      {isLoggedIn ? (
        <NavLink to="/perfil" className={linkClassDireita}>
          <strong>{isAdmin ? '⭐ Conta Admin' : 'Minha Conta'}</strong>
        </NavLink>
      ) : (
        <NavLink to="/login" className={linkClassDireita}>
          Login
        </NavLink>
      )}
    </header>
  )
}

export default Header
