import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/-$locale/contact"!</div>;
}
