import { Link, type LinkProps } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

type BannerProps = {
  title: string;
  description: string;
  primaryAction?: {
    link: LinkProps;
    label: string;
  };
  secondaryAction?: {
    link: LinkProps;
    label: string;
  };
  image?: string;
  isDark?: boolean;
};

const Banner = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  image = "bg-[url(https://placehold.co/1120x520/4a413a/4a413a)]",
  isDark,
}: BannerProps) => {
  return (
    <div
      className={cn(
        "mb-13 rounded-md bg-center bg-cover text-center text-white dark:text-amber-50",
        image,
      )}
    >
      <div
        className={cn(
          "flex h-full min-h-100 w-full items-center justify-center rounded-md p-6 md:min-h-130",
          isDark && "backdrop-brightness-50",
        )}
      >
        <div className="flex w-250 flex-col justify-between">
          <h1 className="mb-8 font-extrabold text-2xl md:mb-3 md:text-5xl">{title}</h1>
          <p className="mb-6 hidden whitespace-pre-line leading-7 md:block md:font-bold lg:text-lg">
            {description}
          </p>
          <div className="space-y-4">
            {primaryAction && (
              <Link to={primaryAction.link.to} className="btn-primary mx-2">
                {primaryAction.label}
              </Link>
            )}
            {secondaryAction && (
              <Link to={secondaryAction.link.to} className="btn-secondary mx-2">
                {secondaryAction.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
