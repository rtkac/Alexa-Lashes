import { Review } from '@alexa-lashes/contracts/reviews';
import { Button } from '@alexa-lashes/ui/shadcn';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { m } from '@/paraglide/messages';

type ReviewContentProps = {
  review: Review;
};

const ReviewContent = ({ review }: ReviewContentProps) => (
  <>
    <div className="mb-3">
      <div className="mb-3 flex gap-0.5 text-primary" aria-hidden="true">
        {Array.from({ length: review.rating }).map((_, index) => (
          <StarIcon key={`${review.id}-${index}`} size="15" fill="currentColor" />
        ))}
      </div>
      <span itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
        <span className="sr-only">{m.reviews_rating({ rating: review.rating })}</span>
        <meta itemProp="worstRating" content="1" />
        <meta itemProp="ratingValue" content={String(review.rating)} />
        <meta itemProp="bestRating" content="5" />
      </span>
      <p className="text-pretty text-neutral-700" itemProp="reviewBody">
        {review.description}
      </p>
    </div>
    <div
      className="flex items-baseline justify-between gap-3"
      itemProp="itemReviewed"
      itemScope
      itemType="https://schema.org/BeautySalon"
      itemID="https://alexalashes.sk/#salon"
    >
      <meta itemProp="name" content="Alexa Lashes" />
      <p
        className="font-bold text-foreground text-sm"
        itemProp="author"
        itemScope
        itemType="https://schema.org/Person"
      >
        <span itemProp="name">{review.name}</span>
      </p>
      <p className="shrink-0 text-neutral-500 text-xs">{m.reviews_source()}</p>
    </div>
  </>
);

type ReviewsProps = {
  reviews: Review[];
  title: string;
};

const Reviews = ({ reviews, title }: ReviewsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanGoPrev(emblaApi.canGoToPrev());
      setCanGoNext(emblaApi.canGoToNext());
    };
    update();
    emblaApi.on('select', update).on('reinit', update);
    return () => {
      emblaApi.off('select', update).off('reinit', update);
    };
  }, [emblaApi]);

  const goToPrev = () => emblaApi?.goToPrev();
  const goToNext = () => emblaApi?.goToNext();

  const arrows = (
    <div className="flex gap-3">
      <Button
        variant="outline"
        size="icon"
        aria-label={m.reviews_prev()}
        onClick={goToPrev}
        disabled={!canGoPrev}
      >
        <ChevronLeftIcon className="size-6" aria-hidden="true" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label={m.reviews_next()}
        onClick={goToNext}
        disabled={!canGoNext}
      >
        <ChevronRightIcon className="size-6" aria-hidden="true" />
      </Button>
    </div>
  );

  return (
    <section
      aria-roledescription={m.reviews_carousel_roledescription()}
      aria-label={m.reviews_carousel_label()}
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 md:mb-8">
        <div>
          <h2 className="mb-1 text-balance font-bold text-3xl md:text-4xl">{title}</h2>
          <p className="text-neutral-600 text-sm">{m.home_hero_rating()}</p>
        </div>
        {arrows}
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y touch-pinch-zoom gap-4">
          {reviews.map((review) =>
            review.url ? (
              <a
                key={review.id}
                href={review.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card flex min-w-0 shrink-0 grow-0 basis-[75%] xs:basis-[45%] flex-col justify-between p-6 no-underline transition-colors hover:cursor-pointer hover:border-primary hover:no-underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-strong md:basis-[40%] lg:basis-[calc(33.1%-8px)]"
                itemScope
                itemType="https://schema.org/Review"
              >
                <ReviewContent review={review} />
                <span className="sr-only">{m.link_new_tab()}</span>
              </a>
            ) : (
              <div
                key={review.id}
                className="card flex min-w-0 shrink-0 grow-0 basis-[75%] xs:basis-[45%] flex-col justify-between p-6 no-underline hover:no-underline md:basis-[40%] lg:basis-[calc(33.1%-8px)]"
                itemScope
                itemType="https://schema.org/Review"
              >
                <ReviewContent review={review} />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
