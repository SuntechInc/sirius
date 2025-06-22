"use client";
import { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminHome() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [companies, setCompanies] = useState<string[]>([])

  useEffect(() => {
    fetch('/bff/users/profile', {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) throw new Error('Não autenticado')
        const data = await res.json()
        if (data.type !== 'GLOBAL_ADMIN') {
          return router.replace('/dashboard')
        }
        setCompanies(data.companies || [])
        setLoading(false)
      })
      .catch(() => router.replace('/login'))
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Validando acesso...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Área Administrativa</h1>
      </header>

      <main className="max-w-4xl mx-auto space-y-4">
        <p className="text-gray-700">Selecione uma empresa para gerenciar:</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {companies.map(companyId => (
            <button
              key={companyId}
              onClick={() =>
                router.push(`/admin/company/${companyId}`)
              }
              className="w-full text-left bg-white rounded-xl shadow hover:shadow-md p-4 transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                Empresa: {companyId}
              </h2>
            </button>
          ))}
        </div>
      </main>
    </div>
  )
}
