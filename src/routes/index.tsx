import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/contact" className="block py-1 text-blue-800 hover:text-blue-600">
        contact
      </Link>
      <Link to="/services" className="block py-1 text-blue-800 hover:text-blue-600">
        services
      </Link>
      <Link to="/gallery" className="block py-1 text-blue-800 hover:text-blue-600">
        gallery
      </Link>
    </div>
  );
}
