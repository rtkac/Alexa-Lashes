import { buttonVariants } from '@alexa-lashes/ui/shadcn';
import { Link } from '@tanstack/react-router';

import { m } from '@/paraglide/messages';
import { cdnSrc, cdnSrcSet } from '@/utils/image';

export const AboutUs = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:gap-12">
      <div className="flex max-h-80 items-center justify-center overflow-hidden rounded-xl sm:max-h-full md:max-h-105">
        <img
          src={cdnSrc('/salon-alexa.webp', 640, 85)}
          srcSet={cdnSrcSet('/salon-alexa.webp', 1000, [400, 640, 800], 85)}
          sizes="(min-width: 72rem) 536px, (min-width: 40rem) 50vw, 100vw"
          alt={m.home_about_us_image_alt()}
          width={1000}
          height={1333}
          className="h-auto w-full rounded-xl"
          loading="lazy"
        />
      </div>
      <div className="text-center sm:text-left">
        <div className="mb-8 space-y-5">
          <h2 className="text-balance font-bold text-xl md:text-3xl">{m.home_about_us_title()}</h2>
          <p className="text-neutral-600 leading-6">{m.home_about_us_desc_1()}</p>
          <p className="text-neutral-600 leading-6">{m.home_about_us_desc_2()}</p>
        </div>
        <Link to="/about/" className={buttonVariants({ variant: 'outline' })}>
          {m.home_about_us_link()}
        </Link>
      </div>
    </div>
  );
};
