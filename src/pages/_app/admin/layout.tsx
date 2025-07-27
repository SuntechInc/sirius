import { UserType } from "@/types/user";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/admin")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const isNotAdmin = context.auth.user?.userType !== UserType.GLOBAL_ADMIN;

    if (isNotAdmin) {
      throw redirect({
        to: "/dashboard",
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
