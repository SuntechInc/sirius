import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserType } from "@/types/user";
import { validateTokenAndGetUser } from "@/lib/auth-utils";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import Cookies from "js-cookie";

export const Route = createFileRoute("/_app")({
  component: LayoutComponent,
  beforeLoad: async ({ location }) => {
    const user = validateTokenAndGetUser();

    if (!user) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }

    if (user.userType === UserType.GLOBAL_ADMIN) {
      throw redirect({
        to: "/admin",
      });
    }
  },
});

function LayoutComponent() {
  const defaultOpen = Cookies.get("sidebar_state") === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1">
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
