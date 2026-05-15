import axios from 'axios'

// Axios instance, baseURL uses Vite proxy to backend
const client = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export default client
