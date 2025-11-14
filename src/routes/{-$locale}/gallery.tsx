import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/-$locale/gallery"!</div>;
}
