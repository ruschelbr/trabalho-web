import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormPagina, FormTitulo, FormCampo, FormAcoes, FormUpload } from '../components/FormPagina.jsx'
import api from '../api/api.js'

function Cadastro() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', email: '', senha: '', album: '' })
  const [albuns, setAlbuns] = useState([])
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    async function carregarAlbuns() {
      try {
        const response = await api.getAlbums()
        setAlbuns(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    carregarAlbuns()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setEnviando(true)

    try {
      const payload = {
        name: form.nome,
        email: form.email,
        password: form.senha,
        profilePicture: '/logo.jpg',
      }

      if (form.album) {
        payload.favoriteAlbumId = Number(form.album)
      }

      const response = await api.register(payload)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('UserId', response.data.UserId)
      navigate('/perfil')
    } catch (error) {
      console.log(error)
      const mensagem = error.response?.data?.message
      if (error.response?.status === 409) {
        setErro('Este email já está cadastrado.')
      } else if (error.response?.status === 400 && mensagem) {
        setErro(mensagem)
      } else {
        setErro('Não foi possível cadastrar agora. Tente novamente em alguns instantes.')
      }
    } finally {
      setEnviando(false)
    }
  }

  const isFormValid = form.nome.trim() !== '' && form.email.trim() !== '' && form.senha.trim() !== ''

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo>Cadastro</FormTitulo>
      <FormCampo label="Nome:">
        <input
          type="text"
          name="nome"
          id="nome-cadastro"
          className="form-input linha-form"
          value={form.nome}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Email:">
        <input
          type="email"
          name="email"
          id="email-cadastro"
          className="form-input linha-form"
          value={form.email}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Senha:">
        <input
          type="password"
          name="senha"
          id="senha-cadastro"
          className="form-input linha-form"
          value={form.senha}
          onChange={handleChange}
        />
      </FormCampo>
      <FormCampo label="Álbum favorito:">
        <select
          name="album"
          id="album-cadastro"
          className="dropdown-form linha-form"
          value={form.album}
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            {albuns.length === 0 ? 'Nenhum álbum disponível' : 'Selecione um álbum'}
          </option>
          {albuns.map((album) => (
            <option key={album.id} value={album.id}>
              {album.name}
            </option>
          ))}
        </select>
      </FormCampo>
      <FormUpload id="perfil-cadastro" name="perfil" label="Foto de perfil:" />
      {erro && <p className="comentarios-status comentarios-erro">{erro}</p>}
      <FormAcoes>
        <span className="btn-wrapper">
          <button
            type="submit"
            className="btn linha-form texto-escuro"
            disabled={!isFormValid || enviando}
          >
            {enviando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </span>
      </FormAcoes>
    </FormPagina>
  )
}

export default Cadastro
