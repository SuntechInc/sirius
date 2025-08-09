import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/termos")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/termos"!</div>;
}
