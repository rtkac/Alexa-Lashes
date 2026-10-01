import { buttonVariants } from '@alexa-lashes/ui/shadcn';
import { Link } from '@tanstack/react-router';

import { Header } from '@/components/Header';

const NotFound = () => {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-300px)] max-w-180 px-4 py-16 text-center md:py-24">
        <p
          aria-hidden="true"
          className="mb-4 font-bold text-6xl text-primary-strong tabular-nums tracking-tight md:mb-6 md:text-8xl"
        >
          404
        </p>
        <h1 className="mb-4 text-balance font-bold text-xl md:text-2xl">Oops! Page not found.</h1>
        <p className="mx-auto mb-8 max-w-130 text-pretty leading-6">
          The page you are looking for does not exist.
        </p>
        <Link to="/" className={buttonVariants()}>
          Go back to Home
        </Link>
      </main>
    </>
  );
};

export default NotFound;
