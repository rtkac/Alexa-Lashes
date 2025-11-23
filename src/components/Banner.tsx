import { Link } from "@tanstack/react-router";

type BannerProps = {
  title: string;
  description: string;
  primaryAction?: {
    link: string;
    label: string;
  };
  secondaryAction?: {
    link: string;
    label: string;
  };
};

const Banner = ({ title, description, primaryAction, secondaryAction }: BannerProps) => {
  return (
    <div className="mb-13 flex min-h-100 items-center justify-center rounded-md bg-[url(https://placehold.co/1500x800/656e6c/656e6c)] bg-center bg-cover p-6 text-center text-white md:min-h-130">
      <div className="h-full">
        <h1 className="mb-3 font-bold text-2xl md:text-4xl">{title}</h1>
        <p className="mb-6">{description}</p>
        <div className="space-y-4">
          {primaryAction && (
            <Link to={primaryAction.link} className="btn-primary mx-2">
              {primaryAction.label}
            </Link>
          )}
          {secondaryAction && (
            <Link to={secondaryAction.link} className="btn-secondary mx-2">
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
