import { cn } from '@alexa-lashes/ui/lib/utils';

type BannerProps = {
  title: string;
  description: string;
  image?: string;
  isDark?: boolean;
  buttons?: React.ReactNode;
  hideDescriptionOnMobile?: boolean;
};

const Banner = ({
  title,
  description,
  image = 'bg-[url(https://placehold.co/1120x520/4a413a/4a413a)]',
  isDark,
  buttons,
  hideDescriptionOnMobile,
}: BannerProps) => {
  return (
    <div className={cn('mb-13 rounded-md bg-center bg-cover text-center text-white', image)}>
      <div
        className={cn(
          'flex h-full min-h-100 w-full items-center justify-center rounded-md px-5 py-10 sm:p-6 md:min-h-130',
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
