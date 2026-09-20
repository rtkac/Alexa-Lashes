import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { StarIcon } from 'lucide-react';

import { fetchReviewsOptions } from '@/effects/reviews';

function RouteComponent() {
  const context = Route.useRouteContext();

  const { data: reviews } = useSuspenseQuery({
    ...context.fetchReviewsOptions,
    select: (data) => data.toSorted((a, b) => b.displayOrder - a.displayOrder),
  });

  return (
    <div>
      <h1 className="font-bold text-xl md:text-2xl">Reviews</h1>
      <div className="mt-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.length ? (
            reviews.map((review) => (
              <a
                key={review.url}
                href={review.url || '#'} // !! TODO
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 shrink-0 grow-0 basis-[75%] xs:basis-[45%] flex-col justify-between rounded-md border border-primary-light bg-white p-5 no-underline hover:cursor-pointer hover:no-underline md:basis-[40%] lg:basis-[calc(33.1%-8px)] dark:border-tertiary-light dark:bg-tertiary"
              >
                <div className="mb-3">
                  <div className="mb-3 flex space-x-1 text-primary">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <StarIcon key={index} size="17" />
                    ))}
                  </div>
                  <p className="text-neutral-600 text-sm dark:text-amber-50">
                    {review.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="size-8.75 overflow-hidden rounded-full">
                    <img
                      src="/logo.svg"
                      alt={review.name}
                      className="h-full w-full object-cover"
                      width={35}
                      height={35}
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-bold text-black text-sm">
                    <span>{review.name}</span>
                  </h3>
                </div>
              </a>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/_protected/dashboard/')({
  context: () => ({
    fetchReviewsOptions: fetchReviewsOptions(),
  }),
  loader: ({ context }) => {
    context.queryClient.query({ ...context.fetchReviewsOptions, staleTime: 'static' });
  },
  component: RouteComponent,
});
