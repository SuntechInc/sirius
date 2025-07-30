import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { UserType } from "@/types/user";

export const Route = createFileRoute("/_admin/admin")({
	component: RouteComponent,
	beforeLoad: async ({ context: { auth } }) => {
		if (!auth.isAuthenticated) {
			throw redirect({
				to: "/login",
			});
		}

		if (
			location.pathname.startsWith("/admin") &&
			auth.user?.userType !== UserType.GLOBAL_ADMIN
		) {
			throw redirect({ to: "/" });
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
