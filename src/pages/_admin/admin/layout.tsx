import { UserType } from "@/types/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const isNotAdmin = context.auth.user?.userType !== UserType.GLOBAL_ADMIN;

    if (isNotAdmin) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div>
      <h1>Admin</h1>
      <Outlet />
    </div>
  );
}
