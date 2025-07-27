import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/admin/")({
  component: AdminComponent,
});

function AdminComponent() {
  return <div>Hello "/_app/admin/"!</div>;
}
