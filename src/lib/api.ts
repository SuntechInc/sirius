import axios, { type AxiosInstance } from 'axios'
import { ApiError, NetworkError } from '@/types/api'
import { getSession } from './session'

export const createHttpClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Interceptor para requests
  client.interceptors.request.use(
    async config => {
      // Adicionar token de autenticação se necessário
      const { token } = await getSession()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    error => Promise.reject(error)
  )

  // Interceptor para responses
  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        // Erro com resposta do servidor
        throw new ApiError(
          error.response.data?.message || 'Erro na API',
          error.response.status,
          error.response.data?.code
        )
      } else if (error.request) {
        throw new NetworkError('Erro de conexão', error)
      } else {
        throw new Error('Erro desconhecido')
      }
    }
  )

  return client
}
