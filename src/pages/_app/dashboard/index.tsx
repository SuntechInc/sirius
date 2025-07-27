import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/")({
  component: DashboardComponent,
  head: () => ({
    meta: [
      {
        title: "Dashboard | Quality Flow",
      },
    ],
  }),
});

function DashboardComponent() {
  return <div>Dashboard!</div>;
}
