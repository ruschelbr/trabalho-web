import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Sobre from './pages/Sobre.jsx'
import Contato from './pages/Contato.jsx'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Discografia from './pages/Discografia.jsx'
import MusicaExemplo from './pages/MusicaExemplo.jsx'
import CadastrarAlbum from './pages/CadastrarAlbum.jsx'
import Perfil from './pages/Perfil.jsx'
import EditarPerfil from './pages/EditarPerfil.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discografia" element={<Discografia />} />
        <Route path="/musica-exemplo" element={<MusicaExemplo />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastrar-album" element={<CadastrarAlbum />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
