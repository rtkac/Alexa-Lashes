import { Link } from "@tanstack/react-router";

import { m } from "@/paraglide/messages";

const NotFound = () => {
  return (
    <div className="text-center p-10 md:p-20 max-w-180 mx-auto">
      <h1 className="text-primary text-5xl md:text-7xl font-bold mb-5 md:mb-6">404</h1>
      <h2 className="text-xl md:text-3xl font-bold mb-4">{m.notFound_title()}</h2>
      <p className="mb-7 md:mb-9">{m.notFound_desc()}</p>
      <Link to="/" className="btn-primary">
        {m.notFound_link()}
      </Link>
    </div>
  );
};

export default NotFound;
