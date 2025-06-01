import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

//Interceptory do logowania - dla testu
axiosClient.interceptors.request.use(
  (config) => {
    // console.log('Request:', config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response Error:', error)
    return Promise.reject(error)
  }
)

export default axiosClient
