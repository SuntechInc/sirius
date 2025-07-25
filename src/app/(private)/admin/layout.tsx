import { cookies } from 'next/headers'
import { AdminSidebar } from '@/components/admin-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
