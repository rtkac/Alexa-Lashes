import { Link } from '@tanstack/react-router';

const NotFound = () => {
  return (
    <div className="mx-auto max-w-180 p-10 text-center md:p-20">
      <h1 className="mb-5 font-bold text-5xl text-primary md:mb-6 md:text-7xl">404</h1>
      <h2 className="mb-4 font-bold text-xl md:text-3xl">Oops! Page not found.</h2>
      <p className="mb-7 md:mb-9">The page you are looking for does not exist.</p>
      <Link to="/" className="btn-primary">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
