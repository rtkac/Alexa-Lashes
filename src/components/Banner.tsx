import { Link, type LinkProps } from "@tanstack/react-router";

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
};

const Banner = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  image = "bg-[url(https://placehold.co/1120x520/4a413a/4a413a)]",
}: BannerProps) => {
  return (
    <div
      className={`mb-13 flex min-h-100 items-center justify-center rounded-md ${image} bg-center bg-cover p-6 text-center text-white md:min-h-130 lg:bg-position-[center_top_-105rem] dark:text-amber-50`}
    >
      <div className="flex w-250 flex-col justify-between">
        <h1 className="mb-8 font-extrabold text-2xl md:mb-3 md:text-5xl">{title}</h1>
        <p className="mb-6 hidden md:block md:font-bold">{description}</p>
        <div className="space-y-4">
          {primaryAction && (
            <Link preload="intent" to={primaryAction.link.to} className="btn-primary mx-2">
              {primaryAction.label}
            </Link>
          )}
          {secondaryAction && (
            <Link preload="intent" to={secondaryAction.link.to} className="btn-secondary mx-2">
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
