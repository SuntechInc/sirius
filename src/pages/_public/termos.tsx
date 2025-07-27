import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/termos")({
  component: TermsComponent,
});

function TermsComponent() {
  return <div>Hello "/_public/termos"!</div>;
}
