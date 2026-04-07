import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-react";

import type { Review } from "@/types";

type ReviewsProps = {
  reviews: Review[];
};

const Reviews = ({ reviews }: ReviewsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: false });

  const goToPrev = () => emblaApi?.goToPrev();
  const goToNext = () => emblaApi?.goToNext();

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom gap-4">
          {reviews.map((review) => (
            <a
              key={review.url}
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 shrink-0 grow-0 basis-[75%] xs:basis-[45%] flex-col justify-between rounded-md border border-primary-light bg-white p-5 hover:cursor-pointer hover:no-underline md:basis-[40%] lg:basis-[calc(33.1%-8px)] dark:border-tertiary-light dark:bg-tertiary"
            >
              <div className="mb-3">
                <div className="mb-3 flex space-x-1 text-primary">
                  <StarIcon size="17" />
                  <StarIcon size="17" />
                  <StarIcon size="17" />
                  <StarIcon size="17" />
                  <StarIcon size="17" />
                </div>
                <p className="text-neutral-600 text-sm dark:text-amber-50">{review.description}</p>
              </div>
              <div className="flex items-center space-x-2.5">
                <div className="size-8.75 overflow-hidden rounded-full">
                  <img
                    src="/logo.svg"
                    alt={review.name}
                    className="h-full w-full object-cover"
                    width={35}
                    height={35}
                  />
                </div>
                <h3 className="font-bold text-black text-sm">{review.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="absolute top-1/2 -left-3 flex h-9 w-9 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border-2 border-primary-light bg-white text-primary shadow-lg shadow-primary-light transition hover:shadow-none xl:-left-5"
        onClick={goToPrev}
      >
        <ChevronLeftIcon size={24} />
      </button>
      <button
        type="button"
        className="absolute top-1/2 -right-3 flex h-9 w-9 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border-2 border-primary-light bg-white text-primary shadow-lg shadow-primary-light transition hover:shadow-none xl:-right-5"
        onClick={goToNext}
      >
        <ChevronRightIcon size={24} />
      </button>
    </div>
  );
};

export default Reviews;
