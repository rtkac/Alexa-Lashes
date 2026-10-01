import { buttonVariants } from '@alexa-lashes/ui/shadcn';
import { Link } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';

const NotFound = () => {
  return (
    <div className="mx-auto max-w-180 px-4 py-16 text-center md:py-24">
      <title>{m.meta_notFound_title()}</title>
      <meta name="robots" content="noindex" />
      <p
        aria-hidden="true"
        className="mb-4 font-bold text-6xl text-primary-strong tabular-nums tracking-tight md:mb-6 md:text-8xl"
      >
        404
      </p>
      <h1 className="mb-4 text-balance font-bold text-2xl md:text-4xl">{m.notFound_title()}</h1>
      <p className="mx-auto mb-8 max-w-130 text-pretty leading-6 md:mb-10">{m.notFound_desc()}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className={buttonVariants()}>
          {m.notFound_link()}
        </Link>
        <Link to="/contact/" className={buttonVariants({ variant: 'outline' })}>
          {m.menu_contact()}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
