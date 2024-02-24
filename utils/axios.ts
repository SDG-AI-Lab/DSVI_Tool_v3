import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'http://localhost:3000/',
  // baseURL: 'https://sdg-ai-lab-dsvi-tool-server.onrender.com/',
  // this option allows to receive cookies for this nextJS app
  withCredentials: true,
})

export default customFetch
