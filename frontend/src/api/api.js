import axios from 'axios'

const url = 'http://localhost:3000/api'

//contato
async function createContact(contact) {
  return axios.post(url + '/contacts', contact)
}

// comentarios
async function getSongComments(songId) {
  return axios.get(`${url}/songs/${songId}/comments`)
}

async function createComment(comment, token) {
  return axios.post(`${url}/comments`, comment, {
    headers: { Authorization: `Bearer ${token}` },
  })
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

export default { createContact, getSongComments, createComment, getAlbums, getSongsOfAlbum }
