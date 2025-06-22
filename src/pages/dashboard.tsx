// src/pages/dashboard.tsx
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    fetch('/bff/users/profile', {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) throw new Error('Não autenticado')
        const data = await res.json()
        if (data.type === 'GLOBAL_ADMIN') {
          return router.replace('/admin')
        }
        setUser(data)
        setLoading(false)
      })
      .catch(() => {
        router.replace('/login')
      })
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Carregando dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="max-w-4xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard da Empresa</h1>
        <span className="text-gray-600">Olá, {user!.name}</span>
      </header>

      <main className="max-w-4xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Exemplos de cards */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Visão Geral</h2>
          <p className="text-gray-600">Conteúdo da visão geral aqui.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Usuários</h2>
          <p className="text-gray-600">Gerencie usuários da sua empresa.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-2">Permissões</h2>
          <p className="text-gray-600">Revise permissões atribuídas.</p>
        </div>
      </main>
    </div>
  )
}
