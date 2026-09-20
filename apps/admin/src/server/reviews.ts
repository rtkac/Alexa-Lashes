import { getReviews as getReviewsFromDb } from '@alexa-lashes/db/queries/reviews';
import { createServerFn } from '@tanstack/react-start';

export const getReviews = createServerFn({
  method: 'GET',
})
  .validator((data: { locale: string }) => data)
  .handler(async ({ data }) => {
    return getReviewsFromDb(data.locale);
  });
