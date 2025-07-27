import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({
  component: Index,
});

function Index() {
  return <Button>Landing Page</Button>;
}
