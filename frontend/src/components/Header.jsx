import { NavLink } from 'react-router-dom'

function Header() {
  const linkClass = ({ isActive }) =>
    `mx-xs-1 mx-sm-3 mx-lg-5 texto-claro links-animacao links-header${isActive ? ' active' : ''}`

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
      <NavLink to="/login" className={`ms-auto me-xs-1 me-sm-3 me-lg-5 texto-claro links-animacao links-header`}>
        Login
      </NavLink>
    </header>
  )
}

export default Header
