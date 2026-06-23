import axios from 'axios'

const url = 'http://localhost:3000'

async function createContact(contact) {
  return axios.post(url + '/contacts', contact)
}

async function getSongComments(songId) {
  return axios.get(`${url}/songs/${songId}/comments`)
}

async function createComment(comment, token) {
  return axios.post(`${url}/comments`, comment, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export default { createContact, getSongComments, createComment }
