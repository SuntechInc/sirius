import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quality Flow',
  description:
    'Automação e inteligência na gestão de qualidade para empresas que buscam excelência.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
