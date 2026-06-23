import axios from 'axios'

const url = 'http://localhost:3000/api'

async function createContact(contact) {
  return axios.post(`${url}/contacts`, contact)
}

async function login(credentials) {
  return axios.post(`${url}/login`, credentials)
}

async function register(data) {
  return axios.post(`${url}/register`, data)
}

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

export default { createContact, login, register, getSongComments, createComment }
