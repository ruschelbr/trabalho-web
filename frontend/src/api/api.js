import axios from 'axios'

const url = 'http://localhost:3000'

async function createContact(contact) {
  return axios.post(url + '/contacts', contact)
}

export default { createContact }
