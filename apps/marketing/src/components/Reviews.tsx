import { Review } from '@alexa-lashes/contracts/reviews';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from 'lucide-react';

import { address, telephoneNumber } from '@/types';

type ReviewContentProps = {
  review: Review;
};

const ReviewContent = ({ review }: ReviewContentProps) => (
  <>
    <div className="mb-3">
      <div className="mb-3 flex space-x-1 text-primary" aria-hidden="true">
        {Array.from({ length: review.rating }).map((_, index) => (
          <StarIcon key={`${review.id}-${index}`} size="17" />
        ))}
      </div>
      <span className="sr-only">Rating: {review.rating} out of 5</span>
      <meta itemProp="worstRating" content="1" />
      <meta itemProp="ratingValue" content={String(review.rating)} />
      <meta itemProp="bestRating" content="5" />
      <p className="text-neutral-600 text-sm dark:text-amber-50" itemProp="reviewBody">
        {review.description}
      </p>
    </div>
    <div className="flex items-center space-x-2.5">
      <div
        className="size-8.75 overflow-hidden rounded-full"
        itemProp="itemReviewed"
        itemScope
        itemType="https://schema.org/LocalBusiness"
      >
        <meta itemProp="name" content="Alexa Lashes" />
        <meta itemProp="telephone" content={telephoneNumber} />
        <meta itemProp="address" content={address} />
        <img
          src="/logo.svg"
          alt={review.name}
          className="h-full w-full object-cover"
          width={35}
          height={35}
          itemProp="image"
          loading="lazy"
        />
      </div>
      <h3
        className="font-bold text-black text-sm"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        <span itemProp="name">{review.name}</span>
      </h3>
    </div>
  </>
);

type ReviewsProps = {
  reviews: Review[];
};

const Reviews = ({ reviews }: ReviewsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', loop: false });

  const goToPrev = () => emblaApi?.goToPrev();
  const goToNext = () => emblaApi?.goToNext();

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom gap-4">
          {reviews.map((review) =>
            review.url ? (
              <a
                key={review.id}
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 shrink-0 grow-0 basis-[75%] xs:basis-[45%] flex-col justify-between rounded-md border border-primary-light bg-white p-5 no-underline hover:no-underline md:basis-[40%] lg:basis-[calc(33.1%-8px)] dark:border-tertiary-light dark:bg-tertiary hover:cursor-pointer"
                itemScope
                itemType="https://schema.org/Review"
              >
                <ReviewContent review={review} />
              </a>
            ) : (
              <div
                key={review.id}
                className="flex min-w-0 shrink-0 grow-0 basis-[75%] xs:basis-[45%] flex-col justify-between rounded-md border border-primary-light bg-white p-5 no-underline hover:no-underline md:basis-[40%] lg:basis-[calc(33.1%-8px)] dark:border-tertiary-light dark:bg-tertiary"
                itemScope
                itemType="https://schema.org/Review"
              >
                <ReviewContent review={review} />
              </div>
            ),
          )}
        </div>
      </div>
      <button
        type="button"
        aria-label="Previous review"
        className="absolute top-1/2 -left-3 flex h-9 w-9 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border-2 border-primary-light bg-white text-primary shadow-lg shadow-primary-light transition hover:shadow-none xl:-left-5"
        onClick={goToPrev}
      >
        <ChevronLeftIcon size={24} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next review"
        className="absolute top-1/2 -right-3 flex h-9 w-9 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border-2 border-primary-light bg-white text-primary shadow-lg shadow-primary-light transition hover:shadow-none xl:-right-5"
        onClick={goToNext}
      >
        <ChevronRightIcon size={24} aria-hidden="true" />
      </button>
    </div>
  );
};

export default Reviews;
