import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/privacidade")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/privacidade"!</div>;
}
