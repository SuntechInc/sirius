import { api } from '@/lib/api'
import { getSession } from '@/lib/session'

async function getAdminOnly(token: string) {
  const res = await api.get('/auth/admin-only', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}

export default async function TokenTest() {
  const session = await getSession()
  const token = session.token

  const data = await getAdminOnly(token)

  console.log(data)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-4">
        Teste de Autenticação - Múltiplos Endpoints
      </h1>

      <div className="w-full max-w-4xl space-y-4"></div>

      <div className="mt-8 text-gray-500 text-sm text-center max-w-2xl">
        <p>
          Esta página testa se o usuário está autenticado em ambos os endpoints.
        </p>
        <p className="mt-2">
          <strong>Verde</strong> = Acesso permitido | <strong>Vermelho</strong>{' '}
          = Acesso negado
        </p>
      </div>
    </div>
  )
}
