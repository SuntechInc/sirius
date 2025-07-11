import axios from 'axios'
import { createApiClient } from './effect'
import { getSession } from './session'

// Criar instância do axios com interceptors
const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Interceptor para adicionar token
  instance.interceptors.request.use(
    async config => {
      const { token } = await getSession()

      // Rotas públicas que não precisam de token
      const publicRoutes = ['/auth/login', '/auth/register']
      const isPublicRoute = publicRoutes.some(route =>
        config.url?.includes(route)
      )

      if (token && !isPublicRoute) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    error => Promise.reject(error)
  )

  return instance
}

const axiosInstance = createAxiosInstance()
export const apiClient = createApiClient(axiosInstance)
