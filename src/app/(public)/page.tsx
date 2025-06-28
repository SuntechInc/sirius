import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-blue-100 font-sans">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
        Bem-vindo ao Quality Flow
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl text-center">
        Otimize e acompanhe seus fluxos de qualidade de forma simples e
        eficiente.
      </p>
      <Link
        href="/login"
        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold shadow-md transition-colors"
      >
        Ir para Login
      </Link>
    </main>
  )
}
