import axios from 'axios'

const url = 'http://localhost:3000/api'

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
  return axios.get(url + "/albums")
}

async function createAlbum(data) {
  return axios.post(url + "/albums", data)
}

async function uploadImage(formData) {
  return axios.post(url + "/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}

// songs
async function getSongsOfAlbum(albumId) {
  return axios.get(`${url}/albums/${albumId}/songs`)
}

async function createSong(data) {
  return axios.post(url + "/songs", data)
}

export default { createContact, login, register, getSongComments, createComment, getAlbums, createAlbum, uploadImage, getSongsOfAlbum, createSong }
export default { createContact, login, register, getUser, updateUser, getSongComments, createComment, getAlbums, getSongsOfAlbum }
