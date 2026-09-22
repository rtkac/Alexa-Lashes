import type { Locale } from '@alexa-lashes/db/locales';
import { getReviews as getReviewsFromDb } from '@alexa-lashes/db/queries/reviews';
import { createServerFn } from '@tanstack/react-start';

export const getReviews = createServerFn({
  method: 'GET',
})
  .validator((data: { locale: Locale }) => data)
  .handler(async ({ data }) => {
    return getReviewsFromDb(data.locale);
  });
