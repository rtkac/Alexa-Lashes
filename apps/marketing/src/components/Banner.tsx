import { cn } from '@alexa-lashes/ui/lib/utils';

import { cdnSrc, cdnSrcSet } from '@/utils/image';

type BannerSource = {
  src: string;
  width: number;
  height: number;
};

type BannerImage = BannerSource & {
  /** Art-directed image used below the `md` breakpoint. */
  mobile?: BannerSource & { sizes?: string };
  /** Sizing/positioning overrides for the `<img>` (e.g. `object-position`). */
  className?: string;
  sizes?: string;
};

type BannerProps = {
  title: string;
  description: string;
  image: BannerImage;
  isDark?: boolean;
  buttons?: React.ReactNode;
  hideDescriptionOnMobile?: boolean;
};

const Banner = ({
  title,
  description,
  image,
  isDark,
  buttons,
  hideDescriptionOnMobile,
}: BannerProps) => {
  return (
    <div className="relative isolate mb-13 overflow-hidden rounded-xl bg-[#4a413a] text-center text-white">
      <picture>
        {image.mobile && (
          <source
            media="(max-width: 47.99rem)"
            srcSet={cdnSrcSet(image.mobile.src, image.mobile.width)}
            sizes={image.mobile.sizes ?? '100vw'}
            width={image.mobile.width}
            height={image.mobile.height}
          />
        )}
        <img
          src={cdnSrc(image.src, image.width)}
          srcSet={cdnSrcSet(image.src, image.width)}
          sizes={image.sizes ?? '(min-width: 72rem) 1120px, 100vw'}
          width={image.width}
          height={image.height}
          alt="Banner Alexa Lashes"
          fetchPriority="high"
          className={cn('absolute inset-0 -z-10 size-full object-cover', image.className)}
        />
      </picture>
      <div
        className={cn(
          'flex h-full min-h-100 w-full items-center justify-center rounded-xl px-5 py-10 sm:p-6 md:min-h-130',
          isDark
            ? 'backdrop-brightness-50'
            : 'bg-linear-to-b from-black/25 via-black/15 via-45% to-transparent to-75%',
        )}
      >
        <div className="flex w-full max-w-250 flex-col items-center">
          <h1
            className={cn(
              'text-balance font-extrabold text-3xl text-shadow-sm md:text-5xl',
              hideDescriptionOnMobile ? 'mb-8 md:mb-4' : 'mb-4',
            )}
          >
            {title}
          </h1>
          <p
            className={cn(
              'max-w-2xl whitespace-pre-line text-pretty font-medium leading-6 text-shadow-sm md:leading-7 lg:text-lg',
              !isDark && 'md:font-semibold',
              hideDescriptionOnMobile && 'hidden md:block',
            )}
          >
            {description}
          </p>
          {buttons && (
            <div
              className={cn(
                'flex flex-wrap justify-center gap-4',
                hideDescriptionOnMobile ? 'md:mt-8' : 'mt-8',
              )}
            >
              {buttons}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
