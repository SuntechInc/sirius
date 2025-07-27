import { UserType } from "@/types/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const isAdmin = context.auth.user?.userType === UserType.GLOBAL_ADMIN;

    if (isAdmin) {
      throw redirect({
        to: "/admin",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}
