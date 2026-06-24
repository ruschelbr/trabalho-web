import axios from 'axios'

const API_ORIGIN = 'http://localhost:3000'
const url = `${API_ORIGIN}/api`

function resolveImageUrl(imagePath) {
  if (!imagePath) return '/logo.jpg'
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  if (imagePath.startsWith('/uploads/')) return `${API_ORIGIN}${imagePath}`
  return imagePath
}

//contato
async function createContact(contact) {
  return axios.post(`${url}/contacts`, contact)
}

//login
async function login(credentials) {
  return axios.post(`${url}/login`, credentials)
}

async function register(data) {
  return axios.post(`${url}/register`, data)
}

// usuario
async function getUser(userId) {
  return axios.get(`${url}/users/${userId}`)
}

async function updateUser(userId, data) {
  return axios.put(`${url}/users/${userId}`, data)
}

async function uploadImage(fileOrFormData) {
  const formData =
    fileOrFormData instanceof FormData
      ? fileOrFormData
      : (() => {
          const fd = new FormData()
          fd.append('image', fileOrFormData)
          return fd
        })()

  return axios.post(`${url}/upload`, formData)
}

// comentarios
async function getSongComments(songId) {
  return axios.get(`${url}/songs/${songId}/comments`)
}

async function createComment({ text, SongId }, token) {
  return axios.post(
    `${url}/comments`,
    { text, SongId },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

// album
async function getAlbums() {
  return axios.get(`${url}/albums`)
}

async function createAlbum(data) {
  return axios.post(`${url}/albums`, data)
}

// songs
async function getSongsOfAlbum(albumId) {
  return axios.get(`${url}/albums/${albumId}/songs`)
}

async function createSong(data) {
  return axios.post(`${url}/songs`, data)
}

export default {
  createContact,
  login,
  register,
  getUser,
  updateUser,
  uploadImage,
  resolveImageUrl,
  getSongComments,
  createComment,
  getAlbums,
  createAlbum,
  getSongsOfAlbum,
  createSong,
}
