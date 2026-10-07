import { buttonVariants } from '@alexa-lashes/ui/shadcn';
import { Link } from '@tanstack/react-router';
import { StarIcon } from 'lucide-react';

import { m } from '@/paraglide/messages';
import { mapsUrl, whatsAppNumber } from '@/types';
import { cdnSrc, cdnSrcSet } from '@/utils/image';

const heroImage = { src: '/24.webp', width: 800, height: 1037 };

const HomeHero = () => {
  return (
    <section className="mb-16 grid items-center gap-8 md:mb-24 md:grid-cols-[1.1fr_1fr] md:gap-12 lg:gap-20">
      <div>
        <h1 className="mb-5 text-balance font-bold text-4xl leading-[1.05] md:text-5xl lg:text-6xl">
          {m.banner_title()}
        </h1>
        <p className="mb-8 max-w-[46ch] text-pretty text-lg text-neutral-600">{m.banner_desc()}</p>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={whatsAppNumber} className={buttonVariants({ size: 'lg' })}>
            {m.banner_link_contact()}
          </a>
          <Link to="/prices/" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            {m.banner_link_services()}
          </Link>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-medium text-neutral-700 text-sm no-underline hover:underline"
        >
          <StarIcon className="size-4 text-primary" fill="currentColor" aria-hidden="true" />
          {m.home_hero_rating()}
          <span className="sr-only"> {m.link_new_tab()}</span>
        </a>
      </div>
      <div className="overflow-hidden rounded-xl">
        <img
          src={cdnSrc(heroImage.src, 640, 85)}
          srcSet={cdnSrcSet(heroImage.src, heroImage.width, [400, 640], 85)}
          sizes="(min-width: 72rem) 500px, (min-width: 48rem) 45vw, 100vw"
          width={heroImage.width}
          height={heroImage.height}
          alt={m.home_hero_image_alt()}
          fetchPriority="high"
          className="aspect-4/5 h-auto w-full object-cover object-[center_30%] md:aspect-auto md:max-h-150"
        />
      </div>
    </section>
  );
};

export default HomeHero;
