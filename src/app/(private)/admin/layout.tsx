export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col gap-6 p-6 md:p-10">
      {children}
    </div>
  )
}
