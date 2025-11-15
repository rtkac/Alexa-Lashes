import { Link } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

export function NotFound() {
  return (
    <div className="text-center p-20 max-w-2xl mx-auto">
      <h1 className="text-primary text-6xl font-bold mb-6">404</h1>
      <h2 className="text-3xl font-medium mb-4">{m.notFound_title()}</h2>
      <p className="mb-7">{m.notFound_desc()}</p>
      <Link to="/" className="btn-primary">
        {m.notFound_link()}
      </Link>
    </div>
  );
}
