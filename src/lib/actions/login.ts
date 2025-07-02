'use server'

import { redirect } from 'next/navigation'
import { api } from '../api'
import { saveSession } from '../session'
import type { AuthSchema } from '../validations/auth'

export async function login(input: AuthSchema) {
  const { email, password } = input

  try {
    const res = await api.post<{ accessToken: string }>('/auth/login', {
      email,
      password,
    })

    if (res.status === 200 && res.data.accessToken) {
      const { accessToken } = res.data
      await saveSession(accessToken)
      redirect('/dashboard')
    } else {
      throw new Error('Resposta inválida do servidor')
    }
  } catch (error: any) {
    console.error('Erro no login:', error)
    
    // Se for um erro de rede ou servidor
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      throw new Error('Servidor indisponível. Tente novamente mais tarde.')
    }
    
    // Se for um erro de resposta da API
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || 'Erro desconhecido'
      
      if (status === 401) {
        throw new Error('Email ou senha incorretos')
      } else if (status === 400) {
        throw new Error('Dados inválidos')
      } else if (status >= 500) {
        throw new Error('Erro interno do servidor')
      } else {
        throw new Error(message)
      }
    }
    
    // Erro genérico
    throw new Error('Erro ao fazer login. Tente novamente.')
  }
}
