import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/privacidade")({
  component: PrivacyComponent,
});

function PrivacyComponent() {
  return <div>Hello "/_public/privacidade"!</div>;
}
