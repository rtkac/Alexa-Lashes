import { Review } from '@alexa-lashes/contracts/reviews';
import { Button } from '@alexa-lashes/ui/shadcn';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from 'lucide-react';

import { m } from '@/paraglide/messages';

type ReviewContentProps = {
  review: Review;
};

const ReviewContent = ({ review }: ReviewContentProps) => (
  <>
    <div className="mb-3">
      <div className="mb-3 flex space-x-1 text-primary" aria-hidden="true">
        {Array.from({ length: review.rating }).map((_, index) => (
          <StarIcon key={`${review.id}-${index}`} size="17" fill="currentColor" />
        ))}
      </div>
      <span className="sr-only">{m.reviews_rating({ rating: review.rating })}</span>
      <meta itemProp="worstRating" content="1" />
      <meta itemProp="ratingValue" content={String(review.rating)} />
      <meta itemProp="bestRating" content="5" />
      <p className="text-neutral-600 text-sm" itemProp="reviewBody">
        {review.description}
      </p>
    </div>
    <div className="flex items-center space-x-2.5">
      <div
        className="size-8.75 overflow-hidden rounded-full"
        itemProp="itemReviewed"
        itemScope
        itemType="https://schema.org/BeautySalon"
        itemID="https://alexalashes.sk/#salon"
      >
        <meta itemProp="name" content="Alexa Lashes" />
        <img
          src="/logo.svg"
          alt=""
          className="h-full w-full object-cover"
          width={35}
          height={35}
          loading="lazy"
        />
      </div>
      <p
        className="font-bold text-black text-sm"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        <span itemProp="name">{review.name}</span>
      </p>
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
    <section
      aria-roledescription={m.reviews_carousel_roledescription()}
      aria-label={m.reviews_carousel_label()}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom gap-4">
          {reviews.map((review) =>
            review.url ? (
              <a
                key={review.id}
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex min-w-0 shrink-0 grow-0 basis-[75%] xs:basis-[45%] flex-col justify-between p-5 no-underline transition-colors hover:cursor-pointer hover:border-primary hover:no-underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-strong md:basis-[40%] lg:basis-[calc(33.1%-8px)]"
                itemScope
                itemType="https://schema.org/Review"
              >
                <ReviewContent review={review} />
                <span className="sr-only">{m.link_new_tab()}</span>
              </a>
            ) : (
              <div
                key={review.id}
                className="card flex min-w-0 shrink-0 grow-0 basis-[75%] xs:basis-[45%] flex-col justify-between p-5 no-underline hover:no-underline md:basis-[40%] lg:basis-[calc(33.1%-8px)]"
                itemScope
                itemType="https://schema.org/Review"
              >
                <ReviewContent review={review} />
              </div>
            ),
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-3">
        <Button variant="outline" size="icon" aria-label={m.reviews_prev()} onClick={goToPrev}>
          <ChevronLeftIcon className="size-6" aria-hidden="true" />
        </Button>
        <Button variant="outline" size="icon" aria-label={m.reviews_next()} onClick={goToNext}>
          <ChevronRightIcon className="size-6" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
};

export default Reviews;
