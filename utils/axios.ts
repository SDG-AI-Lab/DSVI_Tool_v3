import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'http://localhost:3000/',
  // this option allows to receive cookies for this nextJS app
  withCredentials: true,
})

export default customFetch
