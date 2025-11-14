import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/services")({
  component: RouteComponent,
});

function RouteComponent() {
  const { locale } = Route.useParams();
  return <div>Hello "/services"! {locale}</div>;
}
