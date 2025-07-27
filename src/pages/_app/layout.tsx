import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
  component: LayoutComponent,
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function LayoutComponent() {
  return (
    <div>
      <h1>Rotas autenticadas</h1>
      <Outlet />
    </div>
  );
}
