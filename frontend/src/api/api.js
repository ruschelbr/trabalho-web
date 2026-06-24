import axios from "axios"

const API_ORIGIN = "http://localhost:3000"
const url = `${API_ORIGIN}/api`

function resolveImageUrl(imagePath) {
  if (!imagePath) return "/logo.jpg"
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
    return imagePath
  if (imagePath.startsWith("/uploads/")) return `${API_ORIGIN}${imagePath}`
  if (imagePath.startsWith("uploads/")) return `${API_ORIGIN}/${imagePath}`
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
  const token = localStorage.getItem("token")
  return axios.get(`${url}/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

async function updateUser(userId, data) {
  const token = localStorage.getItem("token")
  return axios.put(`${url}/users/${userId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

async function uploadImage(fileOrFormData) {
  const token = localStorage.getItem("token")
  const formData =
    fileOrFormData instanceof FormData
      ? fileOrFormData
      : (() => {
          const fd = new FormData()
          fd.append("image", fileOrFormData)
          return fd
        })()

  return axios.post(`${url}/upload`, formData, {
    headers: { Authorization: `Bearer ${token}` },
  })
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

async function pinComment(id, token) {
  return axios.patch(
    `${url}/comments/${id}/pin`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

async function deleteComment(id, token) {
  return axios.delete(
    `${url}/comments/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

// album
async function getAlbums() {
  return axios.get(`${url}/albums`)
}

async function updateAlbum(albumId, data) {
  const token = localStorage.getItem("token")
  return axios.put(`${url}/albums/${albumId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
 
async function deleteAlbum(albumId) {
  const token = localStorage.getItem("token")
  return axios.delete(`${url}/albums/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

async function createAlbum(data) {
  const token = localStorage.getItem("token")
  return axios.post(`${url}/albums`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

// songs
async function getSongsOfAlbum(albumId) {
  return axios.get(`${url}/albums/${albumId}/songs`)
}

async function createSong(data) {
  const token = localStorage.getItem("token")
  return axios.post(`${url}/songs`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

async function getSongById(id) {
  return axios.get(`${url}/songs/${id}`)
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
  pinComment,
  deleteComment,
  getAlbums,
  createAlbum,
  getSongsOfAlbum,
  createSong,
  getSongById,
  updateAlbum,
  deleteAlbum
}
