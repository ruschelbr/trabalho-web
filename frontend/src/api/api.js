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
async function getAlbums(){
  return axios.get(url + "/albums")
}
// pra cadastrar e editar o album tbm -- Pedro

// songs
async function getSongsOfAlbum(){
  return axios.get(url + "/albums/:albumId/songs")
}

export default { createContact, login, register, getUser, updateUser, getSongComments, createComment, getAlbums, getSongsOfAlbum }
