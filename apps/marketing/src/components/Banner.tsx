import { cn } from '@alexa-lashes/ui/lib/utils';

type BannerProps = {
  title: string;
  description: string;
  image?: string;
  isDark?: boolean;
  buttons?: React.ReactNode;
};

const Banner = ({
  title,
  description,
  image = 'bg-[url(https://placehold.co/1120x520/4a413a/4a413a)]',
  isDark,
  buttons,
}: BannerProps) => {
  return (
    <div className={cn('mb-13 rounded-md bg-center bg-cover text-center text-white', image)}>
      <div
        className={cn(
          'flex h-full min-h-100 w-full items-center justify-center rounded-md p-6 md:min-h-130',
          isDark
            ? 'backdrop-brightness-50'
            : 'bg-linear-to-b from-black/25 via-black/15 via-45% to-transparent to-75%',
        )}
      >
        <div className="flex w-250 flex-col justify-between">
          <h1 className="mb-8 text-balance font-extrabold text-3xl text-shadow-sm md:mb-3 md:text-5xl">
            {title}
          </h1>
          <p className="mb-6 hidden whitespace-pre-line text-shadow-sm leading-7 md:block md:font-bold lg:text-lg">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">{buttons}</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
