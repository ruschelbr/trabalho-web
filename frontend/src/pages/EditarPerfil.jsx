import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormPagina, FormTitulo, FormCampo, FormAcoes, FormUpload } from '../components/FormPagina.jsx'
import api from '../api/api.js'

function EditarPerfil() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', album: '' })
  const [formOriginal, setFormOriginal] = useState({ nome: '', album: '' })
  const [email, setEmail] = useState('')
  const [fotoPerfil, setFotoPerfil] = useState('/logo.jpg')
  const [fotoArquivo, setFotoArquivo] = useState(null)
  const [albuns, setAlbuns] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

  // campos de senha
  const [senhaAtual, setSenhaAtual] = useState('')
  const [senhaNova, setSenhaNova] = useState('')
  const [senhaConfirmar, setSenhaConfirmar] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  useEffect(() => {
    const userId = localStorage.getItem('UserId')
    if (!userId) {
      navigate('/login')
      return
    }

    let ativo = true

    async function carregarDados() {
      setCarregando(true)
      setErro(null)

      try {
        const [usuarioRes, albunsRes] = await Promise.all([
          api.getUser(userId),
          api.getAlbums(),
        ])
        if (!ativo) return

        const usuario = usuarioRes.data
        const valores = {
          nome: usuario.name,
          album: usuario.favoriteAlbumId ? String(usuario.favoriteAlbumId) : '',
        }
        setAlbuns(albunsRes.data)
        setEmail(usuario.email)
        setFotoPerfil(usuario.profilePicture || '/logo.jpg')
        setForm(valores)
        setFormOriginal(valores)
      } catch (error) {
        console.log(error)
        if (!ativo) return
        setErro('Não foi possível carregar seus dados. Tente fazer login novamente.')
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarDados()
    return () => { ativo = false }
  }, [navigate])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleFotoChange(e) {
    const file = e.target.files?.[0]
    if (file) setFotoArquivo(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const userId = localStorage.getItem('UserId')
    if (!userId) {
      navigate('/login')
      return
    }

    setErro(null)

    const isAdmin = localStorage.getItem('admin') === 'true'
    if (/\p{Extended_Pictographic}/u.test(form.nome) && !isAdmin) {
      setErro('Apenas o admin pode usar emojis no nome.')
      return
    }

    // Validações de senha no front (só se o usuário preencheu algum campo de senha)
    const querTrocarSenha = senhaAtual || senhaNova || senhaConfirmar
    if (querTrocarSenha) {
      if (!senhaAtual) {
        setErro('Informe sua senha atual para alterá-la.')
        return
      }
      if (!senhaNova) {
        setErro('Informe a nova senha.')
        return
      }
      if (senhaNova !== senhaConfirmar) {
        setErro('A nova senha e a confirmação não coincidem.')
        return
      }
    }

    setEnviando(true)

    try {
      let profilePicture = fotoPerfil
      if (fotoArquivo) {
        profilePicture = await api.fileToDataUri(fotoArquivo)
      }

      const payload = {
        name: form.nome,
        email,
        profilePicture,
      }

      if (form.album) {
        payload.favoriteAlbumId = Number(form.album)
      }

      if (querTrocarSenha) {
        payload.currentPassword = senhaAtual
        payload.newPassword = senhaNova
      }

      await api.updateUser(userId, payload)
      navigate('/perfil')
    } catch (error) {
      console.log(error)
      if (error.response?.status === 401) {
        setErro('Senha atual incorreta.')
      } else if (error.response?.status === 400) {
        setErro(error.response.data?.message || 'Senha inválida.')
      } else {
        setErro('Não foi possível salvar as alterações. Tente novamente em alguns instantes.')
      }
    } finally {
      setEnviando(false)
    }
  }

  const houveMudanca =
    form.nome !== formOriginal.nome ||
    form.album !== formOriginal.album ||
    fotoArquivo !== null ||
    senhaAtual !== '' ||
    senhaNova !== '' ||
    senhaConfirmar !== ''

  const isFormValid = form.nome.trim() !== '' && houveMudanca

  if (carregando) {
    return (
      <FormPagina onSubmit={(e) => e.preventDefault()}>
        <FormTitulo>Editar</FormTitulo>
        <p className="comentarios-status">Carregando...</p>
      </FormPagina>
    )
  }

  return (
    <FormPagina onSubmit={handleSubmit}>
      <FormTitulo>Editar</FormTitulo>

      <FormCampo label="Nome:">
        <input
          type="text"
          name="nome"
          id="nome-perfil"
          className="form-input linha-form"
          value={form.nome}
          onChange={handleChange}
        />
      </FormCampo>

      <FormCampo label="Álbum favorito:">
        <select
          name="album"
          id="album-perfil"
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

      <FormUpload
        id="perfil-foto"
        name="perfil"
        label="Foto de perfil:"
        onChange={handleFotoChange}
        fileName={fotoArquivo?.name}
      />

      {/* Seção de senha — toggle */}
      <div style={{ padding: '0.25rem 1.5rem 0' }}>
        <button
          type="button"
          className="btn-voltar"
          onClick={() => {
            setMostrarSenha((v) => !v)
            setSenhaAtual('')
            setSenhaNova('')
            setSenhaConfirmar('')
          }}
        >
          {mostrarSenha ? '✕ Cancelar troca de senha' : '🔑 Alterar senha'}
        </button>
      </div>

      {mostrarSenha && (
        <>
          <FormCampo label="Senha atual:">
            <input
              type="password"
              id="senha-atual"
              className="form-input linha-form"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              autoComplete="current-password"
            />
          </FormCampo>
          <FormCampo label="Nova senha:">
            <input
              type="password"
              id="senha-nova"
              className="form-input linha-form"
              value={senhaNova}
              onChange={(e) => setSenhaNova(e.target.value)}
              autoComplete="new-password"
            />
          </FormCampo>
          <FormCampo label="Confirmar nova senha:">
            <input
              type="password"
              id="senha-confirmar"
              className="form-input linha-form"
              value={senhaConfirmar}
              onChange={(e) => setSenhaConfirmar(e.target.value)}
              autoComplete="new-password"
            />
          </FormCampo>
          <p style={{
            padding: '0 1.5rem',
            fontSize: '0.78rem',
            color: 'rgba(25,25,24,0.45)',
            margin: '0',
          }}>
            Mínimo 8 caracteres, com número, maiúscula e minúscula.
          </p>
        </>
      )}

      {erro && <p className="comentarios-status comentarios-erro">{erro}</p>}

      <FormAcoes>
        <div style={{ flex: 1 }}>
          <button type="button" className="btn-voltar" onClick={() => navigate('/perfil')}>
            Voltar
          </button>
        </div>
        <span className="btn-wrapper">
          <button
            type="submit"
            className="btn linha-form"
            disabled={!isFormValid || enviando}
          >
            {enviando ? 'Salvando...' : 'Salvar'}
          </button>
        </span>
        <div style={{ flex: 1 }} />
      </FormAcoes>
    </FormPagina>
  )
}

export default EditarPerfil
